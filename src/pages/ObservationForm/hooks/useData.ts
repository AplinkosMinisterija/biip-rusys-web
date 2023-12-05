import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getMapQueryString } from '../functions';
import { FormProps, FormServerProps } from '../types';
import { default as api, default as Api } from './../../../api';
import { StatusTypes } from './../../../utils/constants';
import { handleErrorFromServerToast, isNew } from './../../../utils/functions';
import { slugs } from './../../../utils/routes';
import { useGetSpecie } from './useGetSpecie';

export const useData = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { specie, specieLoading } = useGetSpecie(id);

  const { data: observationForm, isLoading } = useQuery(
    ['form', id],
    () => Api.getObservationForm(id),
    {
      enabled: !isNew(id),
    },
  );

  const disabled = !!observationForm && !observationForm?.canEdit;
  const mapQueryString = getMapQueryString(disabled);

  const createForm = useMutation((values: FormServerProps) => api.createObservationForm(values), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: () => {
      navigate(slugs.observationForms);
    },
    retry: false,
  });

  const updateForm = useMutation(
    (values: FormServerProps) => api.updateObservationForm(values, id),
    {
      onError: () => {
        handleErrorFromServerToast();
      },
      onSuccess: () => {
        navigate(slugs.observationForms);
      },
      retry: false,
    },
  );

  const handleSubmit = async (values: FormProps, helper) => {
    const canSetStatus = !isNew(id) && !values?.status;
    if (canSetStatus) {
      return helper.setFieldValue('status', StatusTypes.SUBMITTED);
    }

    const {
      quantity,
      species,
      method,
      methodValue,
      source,
      description,
      geom,
      observedBy,
      observedAt,
      photos,
      comment,
      evolution,
      activity,
      transect,
    } = values;

    const params: FormServerProps = {
      quantity,
      species: species?.speciesId,
      source: source?.id,
      description,
      observedBy,
      ...(!!methodValue && { methodValue }),
      method,
      observedAt,
      geom,
      comment,
      photos,
      evolution,
      activity,
      ...(!!transect && { transect }),
    };

    if (isNew(id)) {
      return await createForm.mutateAsync(params);
    }

    return await updateForm.mutateAsync(params);
  };

  const initialValues: FormProps = {
    comment: '',
    status: undefined,
    species: observationForm?.species || specie?.taxonomy || undefined,
    source: observationForm?.source || undefined,
    quantity: observationForm?.quantity?.toString() || '',
    method: observationForm?.method || '',
    methodValue: observationForm?.methodValue || '',
    transect: observationForm?.transect || undefined,
    description: observationForm?.description || '',
    observedAt: observationForm?.observedAt || new Date(),
    photos: observationForm?.photos || [],
    geom: observationForm?.geom || '',
    observedBy: observationForm?.observedBy || '',
    isCorrectFormInformation: disabled,
    evolution: observationForm?.evolution,
    activity: observationForm?.activity,
  };

  return {
    handleSubmit,
    loading: isLoading || specieLoading,
    mapQueryString,
    initialValues,
    disabled,
    id,
  };
};
