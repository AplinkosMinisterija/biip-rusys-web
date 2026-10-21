import { FilterInputTypes } from '@aplinkosministerija/design-system';
import { User } from '../types';
import {
  getNoQuantityOptions,
  getObservationFormStatusTypes,
  getRequestStatusTypes,
  getRequestTypes,
  getSourcesList,
  getSpeciesList,
  speciesOptionLabel,
} from './functions';
import { getActivities, getEvolutionOptions, getMethodOptions } from './options';
import { formFiltersLabels } from './texts';

export const myObservationFilterConfig = {
  method: {
    label: formFiltersLabels.method,
    key: 'method',
    optionLabel: (option) => option?.label,
    inputType: FilterInputTypes.singleSelect,
    options: getMethodOptions(),
  },
  evolution: {
    label: formFiltersLabels.evolution,
    key: 'evolution',
    optionLabel: (option) => option?.label,
    inputType: FilterInputTypes.singleSelect,
    options: getEvolutionOptions(),
  },
  activity: {
    label: formFiltersLabels.activity,
    key: 'activity',
    optionLabel: (option) => option?.label,
    inputType: FilterInputTypes.singleSelect,
    options: getActivities(),
  },
  source: {
    label: formFiltersLabels.source,
    key: 'source',
    inputType: FilterInputTypes.asyncSingleSelect,
    optionsApi: getSourcesList,
    optionLabel: (option) => option?.name,
  },
  dateFrom: {
    label: formFiltersLabels.dateFrom,
    key: 'dateFrom',
    inputType: FilterInputTypes.date,
  },
  dateTo: {
    label: formFiltersLabels.dateTo,
    key: 'dateTo',
    inputType: FilterInputTypes.date,
  },
  status: {
    label: formFiltersLabels.status,
    key: 'status',
    inputType: FilterInputTypes.multiselect,
    options: getObservationFormStatusTypes(),
  },
  species: {
    label: formFiltersLabels.species,
    key: 'species',
    inputType: FilterInputTypes.asyncMultiSelect,
    optionsApi: getSpeciesList,
    optionLabel: (option) => speciesOptionLabel(option),
    getOptionValue: (option) => option?.speciesId,
  },
  noQuantityReason: {
    label: formFiltersLabels.noQuantityReason,
    key: 'noQuantityReason',
    optionLabel: (option) => option?.label,
    inputType: FilterInputTypes.singleSelect,
    options: getNoQuantityOptions(),
  },
};

export const observationFilterConfig = (users: User[] = []) => ({
  ...myObservationFilterConfig,
  createdBy: {
    label: formFiltersLabels.users,
    key: 'createdBy',
    inputType: FilterInputTypes.singleSelect,
    optionLabel: (option: User) => `${option?.firstName} ${option?.lastName}`,
    options: users,
  },
});

export const observationRowConfig = [
  ['species'],
  ['createdBy'],
  ['dateFrom', 'dateTo'],
  ['state'],
  ['status'],
  ['source'],
  ['method'],
  ['evolution'],
  ['activity'],
  ['noQuantityReason'],
];

export const deletedRequestFilterConfig = {
  dateFrom: {
    label: formFiltersLabels.dateFrom,
    key: 'dateFrom',
    inputType: FilterInputTypes.date,
  },
  dateTo: {
    label: formFiltersLabels.dateTo,
    key: 'dateTo',
    inputType: FilterInputTypes.date,
  },
  type: {
    label: formFiltersLabels.type,
    key: 'type',
    inputType: FilterInputTypes.multiselect,
    options: getRequestTypes(),
  },
};

export const myRequestFilterConfig = {
  ...deletedRequestFilterConfig,
  status: {
    label: formFiltersLabels.status,
    key: 'status',
    inputType: FilterInputTypes.multiselect,
    options: getRequestStatusTypes(),
  },
};

export const requestFilterConfig = (users: User[]) => ({
  ...myRequestFilterConfig,
  createdBy: {
    label: formFiltersLabels.users,
    key: 'createdBy',
    inputType: FilterInputTypes.singleSelect,
    optionLabel: (option: User) => `${option?.firstName} ${option?.lastName}`,
    options: users,
  },
});

export const requestRowConfig = [['dateFrom', 'dateTo'], ['createdBy'], ['type'], ['status']];
