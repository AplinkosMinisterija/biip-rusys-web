import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import Cookies from 'universal-cookie';
import { FormServerProps } from './pages/ObservationForm/types';
import { RequestFormServerProps } from './pages/RequestForm/types';
import {
  Form,
  FormFiltersProps,
  Request,
  RequestFilterProps,
  Species,
  SpeciesSearchProp,
  Tenant,
  User,
  UserFilters,
} from './types';
import { Populations, Resources, SortFields } from './utils/constants';
const cookies = new Cookies();

interface GetAll {
  resource: string;
  page?: string;
  populate?: string[];
  filter?: string | any;
  query?: string;
  pageSize?: string;
  search?: string;
  searchFields?: string[];
  sort?: string[];
  scope?: string;
  fields?: string[];
}

export interface GetAllResponse<T> {
  rows: T[];
  totalPages: number;
  page: number;
  pageSize: number;
  error?: any;
}

interface TableList<T = any> {
  filter?: T;
  page?: string;
  id?: string;
  pageSize?: string;
  isMy?: boolean;
  scope?: string;
  fields?: string[];
  resource?: Resources;
  search?: string;
}

interface AuthApiProps {
  resource: string;
  params?: any;
}

interface GetOne {
  resource: string;
  id?: string;
  populate?: string[];
  scope?: string;
}
interface UpdateOne {
  resource?: string;
  id?: string;
  params?: any;
}

interface Delete {
  resource: string;
  id: string;
}

interface Create {
  resource: string;
  params: any;
}

class Api {
  private readonly proxy: string = '/api';

  private AuthApiAxios: AxiosInstance;

  constructor() {
    this.AuthApiAxios = Axios.create();

    this.AuthApiAxios.interceptors.request.use(
      (config) => {
        if (!config.url) {
          return config;
        }
        const token = cookies.get('token');
        const profileId = cookies.get('profileId');
        if (token && config.headers) {
          config.headers.Authorization = 'Bearer ' + token;

          if (!isNaN(profileId)) config.headers['X-Profile'] = profileId;
        }
        config.url = this.proxy + config.url;

        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  }

  errorWrapper = async (endpoint: () => Promise<AxiosResponse<any, any>>) => {
    const { data } = await endpoint();

    return data;
  };

  get = async ({
    resource,
    page,
    populate,
    sort,
    filter,
    pageSize,
    search,
    query,
    searchFields,
    scope,
    fields,
  }: GetAll) => {
    const config = {
      params: {
        pageSize: pageSize || 10,
        ...(!!populate && { populate }),
        ...(!!searchFields && { searchFields }),
        ...(!!search && { search }),
        page: page || 1,
        ...(!!filter && { filter }),
        ...(!!sort && { sort }),
        ...(!!query && { query }),
        ...(!!scope && { scope }),
        ...(!!fields && { fields }),
      },
    };

    return this.errorWrapper(() => this.AuthApiAxios.get(`/${resource}`, config));
  };

  getAll = async ({
    resource,
    populate,
    sort,
    filter,
    search,
    query,
    searchFields,
    scope,
    fields,
  }: GetAll) => {
    const config = {
      params: {
        ...(!!populate && { populate }),
        ...(!!searchFields && { searchFields }),
        ...(!!search && { search }),
        ...(!!filter && { filter }),
        ...(!!sort && { sort }),
        ...(!!query && { query }),
        ...(!!scope && { scope }),
        ...(!!fields && { fields }),
      },
    };

    return this.errorWrapper(() => this.AuthApiAxios.get(`/${resource}/all`, config));
  };

  getOne = async ({ resource, id, populate, scope }: GetOne) => {
    const config = {
      params: {
        ...(!!populate && { populate }),
        ...(!!scope && { scope }),
      },
    };

    return this.errorWrapper(() =>
      this.AuthApiAxios.get(`/${resource}${id ? `/${id}` : ''}`, config),
    );
  };

  patch = async ({ resource, id, params }: UpdateOne) => {
    return this.errorWrapper(() => this.AuthApiAxios.patch(`/${resource}/${id}`, params));
  };

  delete = async ({ resource, id }: Delete) => {
    return this.errorWrapper(() => this.AuthApiAxios.delete(`/${resource}/${id}`));
  };
  post = async ({ resource, params }: Create) => {
    return this.errorWrapper(() => this.AuthApiAxios.post(`/${resource}`, params));
  };

  getUserInfo = async (): Promise<User> => {
    return this.errorWrapper(() => this.AuthApiAxios.get('/users/me'));
  };

  logout = async () => {
    return this.errorWrapper(() => this.AuthApiAxios.post('/users/logout'));
  };

  authApi = async ({ resource, params }: AuthApiProps) => {
    return this.errorWrapper(() => this.AuthApiAxios.post(`/${resource}`, params || {}));
  };

  refreshToken = async () => {
    return this.authApi({
      resource: Resources.REFRESH_TOKEN,
      params: { token: cookies.get('refreshToken') },
    });
  };

  login = async (params: any) => {
    return this.authApi({
      resource: Resources.LOGIN,
      params,
    });
  };

  eGatesSign = async () => {
    return this.authApi({
      resource: Resources.E_GATES_SIGN,
    });
  };

  eGatesLogin = async (params) => {
    return this.authApi({
      resource: Resources.E_GATES_LOGIN,
      params,
    });
  };

  getRequests = async ({
    filter,
    page,
  }: TableList<RequestFilterProps>): Promise<GetAllResponse<Request>> =>
    await this.get({
      resource: Resources.REQUESTS,
      page,
      sort: [SortFields.CREATED_AT],
      populate: [Resources.CREATED_BY],
      filter,
    });

  getMyRequests = async ({
    filter,
    page,
  }: TableList<RequestFilterProps>): Promise<GetAllResponse<Request>> =>
    await this.get({
      resource: Resources.MY_REQUESTS,
      page,
      sort: [SortFields.CREATED_AT],
      populate: [Resources.CREATED_BY],
      filter,
    });

  getDeletedRequests = async ({
    filter,
    page,
  }: TableList<RequestFilterProps>): Promise<GetAllResponse<Request>> =>
    await this.get({
      resource: Resources.DELETED_REQUESTS,
      page,
      sort: [SortFields.CREATED_AT],
      populate: [Resources.CREATED_BY],
      filter,
    });

  getRequest = async (scope?: string, id?: string): Promise<Request> =>
    await this.getOne({
      resource: Resources.REQUESTS,
      populate: [Resources.TAXONOMIES, Resources.CAN_EDIT, Resources.GEOM],
      scope,
      id,
    });

  createRequest = async (params: RequestFormServerProps): Promise<Request> => {
    return await this.post({
      resource: Resources.REQUESTS,
      params,
    });
  };
  updateRequest = async (params: RequestFormServerProps, id?: string): Promise<Request> => {
    return await this.patch({
      resource: Resources.REQUESTS,
      params,
      id,
    });
  };

  deleteRequest = async (id: string): Promise<Request> => {
    return await this.delete({
      resource: Resources.REQUESTS,
      id,
    });
  };

  getObservationForms = async ({
    filter,
    page,
    pageSize,
  }: TableList<FormFiltersProps>): Promise<GetAllResponse<Form>> =>
    await this.get({
      resource: Resources.FORMS,
      populate: [Resources.CREATED_BY, Resources.SPECIES],
      filter,
      sort: [SortFields.CREATED_AT],
      page,
      pageSize,
    });

  getMyObservationForms = async ({
    filter,
    page,
    pageSize,
  }: TableList<FormFiltersProps>): Promise<GetAllResponse<Form>> =>
    await this.get({
      resource: Resources.MY_FORMS,
      populate: [Resources.CREATED_BY, Resources.SPECIES],
      filter,
      sort: [SortFields.CREATED_AT],
      page,
      pageSize,
    });

  getObservationForm = async (id: string): Promise<Form> =>
    await this.getOne({
      resource: Resources.FORMS,
      populate: [
        Resources.SPECIES,
        Resources.CREATED_BY,
        Resources.CAN_EDIT,
        Resources.GEOM,
        Populations.SOURCE,
      ],
      id,
    });

  getSpecies = async ({ filter, page, fields }: TableList): Promise<GetAllResponse<Species>> =>
    await this.get({
      resource: Resources.TAXONOMY_SPECIES,
      populate: [Resources.CLASS],
      sort: [SortFields.NAME],
      fields,
      filter,
      page,
    });

  speciesSearch = async ({ search, page, fields }: TableList) =>
    await this.get({
      resource: Resources.TAXONOMY_SEARCH,
      search,
      fields,
      page,
    });

  getSpecie = async (id: string): Promise<Species> =>
    await this.getOne({
      resource: Resources.TAXONOMY_SPECIES,
      populate: [Resources.CLASS],

      id,
    });

  getSpecieByQueryString = async (id: string): Promise<SpeciesSearchProp> =>
    await this.getOne({
      resource: Resources.TAXONOMY_SPECIES,
      populate: [Resources.TAXONOMY],
      id,
    });

  getSpeciesTree = async () =>
    await this.get({
      resource: Resources.TAXONOMY_TREE,
    });

  getTenantInfo = async (id: string) =>
    await this.getOne({
      resource: Resources.TENANT,
      id,
    });

  getSources = async ({ filter, page, fields }: TableList) =>
    await this.get({
      resource: Resources.SOURCES,
      sort: [SortFields.NAME_DESC],
      filter,
      fields,
      page,
    });

  createObservationForm = async (params: FormServerProps): Promise<Form> => {
    return await this.post({
      resource: Resources.FORMS,
      params,
    });
  };
  uploadFiles = async (resource: Resources, files: File[] = []): Promise<any> => {
    if (isEmpty(files)) return [];

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    try {
      const data = await Promise.all(
        files?.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          const { data } = await this.AuthApiAxios.post(
            `/${resource}/${Resources.UPLOAD}`,
            formData,
            config,
          );
          return data;
        }),
      );

      return data?.map((file) => {
        return {
          name: file.filename,
          size: file.size,
          url: file?.url,
        };
      });
    } catch (e: any) {
      return { error: e.response.data.message };
    }
  };

  updateObservationForm = async (params: FormServerProps, id?: string): Promise<Form> => {
    return await this.patch({
      resource: Resources.FORMS,
      params,
      id,
    });
  };

  deleteObservationForm = async (id: string): Promise<Form> =>
    await this.delete({
      resource: Resources.FORMS,
      id,
    });

  getTenantUsers = async ({
    filter,
    page,
    pageSize,
  }: TableList<UserFilters>): Promise<GetAllResponse<User>> =>
    await this.get({
      resource: Resources.USERS,
      page,
      populate: [Populations.ROLE],
      sort: [SortFields.LAST_NAME],
      filter,
      pageSize,
    });

  getAllTenantUsers = async (): Promise<User[]> =>
    await this.getAll({
      resource: Resources.USERS,
      populate: [Populations.ROLE],
      sort: [SortFields.LAST_NAME],
    });

  getTenantUser = async (id: string): Promise<User> =>
    await this.getOne({
      resource: Resources.USERS,
      populate: [Populations.ROLE],
      id,
    });

  createTenantUser = async (params: any): Promise<User> => {
    return await this.post({
      resource: Resources.USERS,
      params,
    });
  };
  updateTenantUser = async (params: any, id?: string): Promise<User> => {
    return await this.patch({
      resource: Resources.USERS,
      params,
      id,
    });
  };

  deleteTenantUser = async (id: string): Promise<User> =>
    await this.delete({
      resource: Resources.USERS,
      id,
    });

  updateProfile = async (params: any, id: string): Promise<User> =>
    await this.patch({
      resource: Resources.USERS,
      params,
      id,
    });

  updateTenant = async (params: any, id?: string): Promise<Tenant> =>
    await this.patch({
      resource: Resources.TENANT,
      params,
      id,
    });

  getRequestHistory = async ({ page, pageSize, id }: TableList) =>
    await this.get({
      resource: `${Resources.REQUESTS}/${id}/${Resources.HISTORY}`,
      page,
      pageSize,
    });

  getObservationFormHistory = async ({ page, pageSize, id }: TableList) =>
    await this.get({
      resource: `${Resources.FORMS}/${id}/${Resources.HISTORY}`,
      page,
      pageSize,
    });

  getMapToken = async () =>
    await this.getOne({
      resource: Resources.MAPS_AUTH,
    });
}

const api = new Api();

export default api;
