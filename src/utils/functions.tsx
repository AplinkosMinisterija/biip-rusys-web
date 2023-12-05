import { map } from 'lodash';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from '../api';
import { FilterConfig } from '../components/other/DynamicFilter/Filter';
import { Columns, Profile, Tenant, User } from '../types';
import {
  CrustaceanMethodType,
  FishMethodType,
  MammalMethodType,
  MolluskMethodType,
  PlantAbundanceType,
  RequestTypes,
  RolesTypes,
  SpeciesTypes,
  StatusTypes,
  TaxonomyOptions,
} from './constants';
import {
  observationFormStatusLabels,
  requestStatusLabels,
  requestTypeLabels,
  roleLabels,
  taxonomyOptionLabels,
  validationTexts,
} from './texts';

export const getErrorMessage = (error) => validationTexts[error] || validationTexts.error;

export const handleErrorFromServerToast = (error?: string) => {
  handleErrorToast(getErrorMessage(error));
};

export const handleErrorToast = (message?: string) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export const handleSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export const isNew = (id?: string) => !id || id === 'naujas';

export const bytesToMb = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';

  const sizeArrayIndex = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  if (sizeArrayIndex === 0) return `${bytes} ${sizes[sizeArrayIndex]})`;
  return `${(bytes / 1024 ** sizeArrayIndex).toFixed(1)} ${sizes[sizeArrayIndex]}`;
};

export const getSpeciesTypes = () => map(SpeciesTypes, (type) => type);

export const getObservationFormStatusTypes = () =>
  map(StatusTypes, (Status) => ({
    id: Status,
    label: observationFormStatusLabels[Status],
  }));

export const getRequestStatusTypes = () =>
  map(StatusTypes, (Status) => ({
    id: Status,
    label: requestStatusLabels[Status],
  }));

export const getRolesTypes = () =>
  map(RolesTypes, (role) => ({
    id: role,
    label: roleLabels[role],
  }));

export const getRequestTypes = () =>
  map(RequestTypes, (state) => ({
    id: state,
    label: requestTypeLabels[state],
  }));

export const getTaxonomyOptions = () =>
  map(TaxonomyOptions, (state) => ({
    id: state,
    label: taxonomyOptionLabels[state],
  }));

export const canShowResponseDate = (status) => {
  return [StatusTypes.APPROVED, StatusTypes.REJECTED, StatusTypes.RETURNED].includes(status);
};

export const sortDesktop = (columns: Columns, key: string, key2: string) => {
  const item = columns?.[key]?.desktopOrder;
  const item2 = columns?.[key2]?.desktopOrder;

  if (!!item2 && !!item) {
    return item > item2 ? 1 : -1;
  }

  return 0;
};

export const sortMobile = (columns: Columns, key: string, key2: string) => {
  const item = columns?.[key]?.mobileOrder;
  const item2 = columns?.[key2]?.mobileOrder;

  if (!!item2 && !!item) {
    return item > item2 ? 1 : -1;
  }

  return sortDesktop(columns, key, key2);
};

export const getSortedColumns = (columns: Columns, isMobile: boolean) =>
  Object.keys(columns).sort((key, key2) =>
    isMobile ? sortMobile(columns, key, key2) : sortDesktop(columns, key, key2),
  );

export const getActiveColumns = (orderedColumns: Columns) =>
  Object.keys(orderedColumns).reduce((obj, key) => {
    if (orderedColumns[key].show) {
      obj[key] = orderedColumns[key];
    }
    return obj;
  }, {});

export const handleToggleColumns = (columns: Columns, key: string) => {
  columns[key].show = !columns[key].show;
};

export const getSpeciesList = async (input: string, page: string) => {
  return await Api.speciesSearch({ search: input, page });
};

export const taxonomyOptionLabel = (taxonomy) =>
  `${taxonomy?.name || '-'} (lot. ${taxonomy?.nameLatin || '-'})`;

export const speciesOptionLabel = (option) =>
  `${option?.speciesName || '-'} (lot. ${option?.speciesNameLatin || '-'})`;

export const getSourcesList = async (input: string, page: string) => {
  return await Api.getSources({
    filter: { name: input },
    page,
  });
};

export const handleIsTenantUser = (profile?: Profile) => !!profile?.role;

export const handleIsTenantOwner = (profile?: Profile) => profile?.role === RolesTypes.ADMIN;

export const handleNavigate = (
  slug: string,
  navigate: NavigateFunction,
  show: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  navigate(slug);
  show(false);
};

export const handleDateRestriction = (filter: FilterConfig, values: any) => {
  if (filter?.key?.includes('From')) {
    const dateTo = filter?.key?.replace('From', 'To');
    if (values?.[dateTo]) {
      return { maxDate: new Date(values[dateTo]) };
    }
  }
  if (filter?.key?.includes('To')) {
    const dateFrom = filter?.key?.replace('To', 'From');
    if (values?.[dateFrom]) {
      return { minDate: new Date(values[dateFrom]) };
    }
  }
};

export const plantAbundanceTypeOptions = Object.keys(PlantAbundanceType);

export const fishMethodTypeOptions = Object.keys(FishMethodType);

export const crustaceanMethodTypeOptions = Object.keys(CrustaceanMethodType);
export const molluskMethodTypeOptions = Object.keys(MolluskMethodType);
export const mammalMethodTypeOptions = Object.keys(MammalMethodType);

export const isProfileFullyCompleted = (user: User) =>
  [user.email, user.phone].every((userProp) => !!userProp);

export const isTenantFullyCompleted = (tenant: Tenant) =>
  [tenant.email, tenant.phone].every((userProp) => !!userProp);
