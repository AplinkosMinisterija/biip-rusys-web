import { addWeeks } from 'date-fns';
import { isEqual } from 'lodash';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { default as api, default as Api } from '../../../api';
import { useAppSelector } from '../../../state/hooks';
import { RequestTypes, SpeciesTypes, StatusTypes } from '../../../utils/constants';
import { handleErrorFromServerToast, isNew } from '../../../utils/functions';
import { useGetCurrentProfile } from '../../../utils/hooks';
import { slugs } from '../../../utils/routes';
import { pageTitles } from '../../../utils/texts';
import { getDeleteInfo, getScope } from '../function';
import { RequestFormProps, RequestFormServerProps } from '../types';
import { useIsDeletedRequest } from './useIsDeletedRequest';

export const useData = () => {
  const userEmail = useAppSelector((state) => state?.user?.userData?.email);
  const currentProfile = useGetCurrentProfile();
  const { id = '' } = useParams();
  const title = isNew(id) ? pageTitles.newRequest : pageTitles.request(id);
  const isDeletedRequest = useIsDeletedRequest();
  const scope = getScope(isDeletedRequest);
  const navigate = useNavigate();

  const { data: request, isFetching } = useQuery(['request', id], () => Api.getRequest(scope, id), {
    onError: () => {
      navigate(slugs.requests);
    },
    refetchOnWindowFocus: false,
    enabled: !isNew(id),
  });

  const disabled = !!request && !request?.canEdit;

  const canDeleteRequest =
    !isDeletedRequest &&
    request?.status &&
    [StatusTypes.SUBMITTED, StatusTypes.CREATED, StatusTypes.RETURNED].includes(request?.status);

  const deleteRequest = useMutation(() => api.deleteRequest(id), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: () => {
      navigate(slugs.requests);
    },
    retry: false,
  });

  const deleteInfo = getDeleteInfo(
    request?.type,
    id,
    canDeleteRequest ? deleteRequest.mutateAsync : undefined,
  );

  const requestMutation = useMutation(
    (values: RequestFormServerProps) =>
      isNew(id) ? api.createRequest(values) : api.updateRequest(values, id),
    {
      onError: () => {
        handleErrorFromServerToast();
      },
      onSuccess: () => {
        navigate(slugs.requests);
      },
      retry: false,
    },
  );

  const handleSubmit = async (values: RequestFormProps, helper) => {
    const canSetStatus = !isNew(id) && !values?.status;
    if (canSetStatus) {
      return helper.setFieldValue('status', StatusTypes.SUBMITTED);
    }

    const {
      type,
      geom,
      taxonomies,
      comment,
      files,
      description,
      notifyEmail,
      receiveDate,
      exactCoordinates,
      accessDate,
      documentTypes,
      speciesTypes,
    } = values;

    const params = {
      type,
      ...(!isEqual(type, RequestTypes.CHECK) && {
        geom,
      }),
      taxonomies: taxonomies?.map((item) => {
        const { id, taxonomy } = item;
        return { id, taxonomy };
      }),
      files,
      speciesTypes,
      documentTypes,
      comment,
      notifyEmail,
      data: {
        description,
        ...(isEqual(values.type, RequestTypes.GET_ONCE) && {
          receiveDate,
          exactCoordinates,
        }),
        ...(isEqual(values.type, RequestTypes.GET) && {
          accessDate,
        }),
      },
    };

    return await requestMutation.mutateAsync(params);
  };

  const initialFormValues: RequestFormProps = {
    notifyEmail: request?.notifyEmail || currentProfile?.email || userEmail || '',
    files: request?.files || [],
    generatedFile: request?.generatedFile || '',
    generatedFileGeojson: request?.generatedFileGeojson || '',
    taxonomies: request?.taxonomies || [],
    description: request?.data?.description || '',
    isCorrectFormInformation: disabled,
    accessDate: request?.data?.accessDate || addWeeks(new Date(), 1),
    receiveDate: request?.data?.receiveDate || new Date(),
    exactCoordinates: request?.data?.exactCoordinates || false,
    commitToProtectData: disabled,
    history: request?.history || undefined,
    type: request?.type || RequestTypes.GET,
    status: undefined,
    comment: '',
    geom: request?.geom || undefined,
    speciesTypes: request?.speciesTypes || [SpeciesTypes.ENDANGERED],
    documentTypes: request?.documentTypes || [],
  };

  const showFileComponent =
    isEqual(request?.status, StatusTypes.APPROVED) && isEqual(request?.type, RequestTypes.GET_ONCE);

  return {
    initialFormValues,
    deleteInfo,
    loading: isFetching,
    disabled,
    id,
    title,
    handleSubmit,
    showFileComponent,
  };
};
