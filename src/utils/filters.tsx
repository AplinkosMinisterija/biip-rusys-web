import { isEmpty } from 'lodash';
import { FormFilters, FormFiltersProps, RequestFilterProps, RequestFilters } from '../types';
import { formatDateFrom, formatDateTo } from './format';

export const mapMyObservationFilters = (filters: FormFilters): FormFiltersProps => {
  const params: FormFiltersProps = {};

  if (filters) {
    (!!filters?.dateFrom || !!filters?.dateTo) &&
      (params.createdAt = {
        ...(filters?.dateFrom && {
          $gte: formatDateFrom(new Date(filters.dateFrom)),
        }),
        ...(filters?.dateTo && {
          $lt: formatDateTo(new Date(filters.dateTo)),
        }),
      });

    filters.species &&
      !isEmpty(filters.species) &&
      (params.species = {
        $in: filters.species.map((specie) => specie.speciesId),
      });

    filters?.method && (params.method = filters?.method?.id);
    filters?.activity && (params.activity = filters?.activity?.id);
    filters?.evolution && (params.evolution = filters?.evolution?.id);
    filters?.source && (params.source = filters?.source?.id);

    filters?.state &&
      !isEmpty(filters?.state) &&
      (params.state = { $in: filters.state.map((state) => state.id) });

    filters?.status &&
      !isEmpty(filters?.status) &&
      (params.status = { $in: filters.status.map((state) => state.id) });
  }
  return params;
};

export const mapObservationFilters = (filters: FormFilters): FormFiltersProps => {
  const params: FormFiltersProps = mapMyObservationFilters(filters);

  if (filters) {
    filters?.createdBy && (params.createdBy = filters.createdBy.id);
  }
  return params;
};

export const mapDeletedRequestFilters = (filters: RequestFilters): RequestFilterProps => {
  const params: RequestFilterProps = {};

  if (filters) {
    (!!filters?.dateFrom || !!filters?.dateTo) &&
      (params.createdAt = {
        ...(filters?.dateFrom && {
          $gte: formatDateFrom(new Date(filters.dateFrom)),
        }),
        ...(filters?.dateTo && {
          $lt: formatDateTo(new Date(filters.dateTo)),
        }),
      });

    !!filters?.type &&
      !isEmpty(filters.type) &&
      (params.type = {
        $in: filters.type.map((state) => state.id),
      });
  }

  return params;
};

export const mapMyRequestFilters = (filters: RequestFilters): RequestFilterProps => {
  const params: RequestFilterProps = mapDeletedRequestFilters(filters);
  if (filters) {
    !!filters?.status &&
      !isEmpty(filters.status) &&
      (params.status = { $in: filters.status.map((state) => state.id) });
  }
  return params;
};

export const mapRequestFilters = (filters: RequestFilters): RequestFilterProps => {
  const params: RequestFilterProps = mapMyRequestFilters(filters);

  if (filters) {
    filters?.createdBy && (params.createdBy = filters.createdBy.id);
  }

  return params;
};
