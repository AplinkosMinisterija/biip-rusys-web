import { map } from 'lodash';
import api from '../api';
import { ClassifierOption } from '../types';
import {
  ClassifierGroups,
  CrustaceanMethodType,
  FishMethodType,
  MammalMethodType,
  MolluskMethodType,
  PlantAbundanceType,
} from './constants';
import {
  crustaceanMethodTypeLabels,
  fishMethodTypeLabels,
  inputLabels,
  mammalMethodTypeLabels,
  molluskMethodTypeLabels,
  plantAbundanceTypeLabels,
} from './texts';

// SelectField drops onChange when two options share a label, and 2026 repeats four legacy ones.
export const deactivatedOptionLabel = (value: string) =>
  `${value} (${inputLabels.deactivatedOption})`;

const methodLabels = {
  ...fishMethodTypeLabels,
  ...molluskMethodTypeLabels,
  ...crustaceanMethodTypeLabels,
  ...mammalMethodTypeLabels,
  ...plantAbundanceTypeLabels,
};

export const getMethodOptions = () =>
  map(
    [
      ...new Set([
        ...Object.keys(FishMethodType),
        ...Object.keys(CrustaceanMethodType),
        ...Object.keys(MolluskMethodType),
        ...Object.keys(MammalMethodType),
        ...Object.keys(PlantAbundanceType),
      ]),
    ].filter((item) => item !== 'OTHER'),
    (Status) => ({
      id: Status,
      label: methodLabels[Status],
    }),
  );

export const getClassifierOptionsList =
  (group: ClassifierGroups) => async (input: string, page: number | string) =>
    await api.getClassifierOptionsPage(group, input, page);

export const getActivityOptionsList = getClassifierOptionsList(ClassifierGroups.ACTIVITY);

export const getEvolutionOptionsList = getClassifierOptionsList(ClassifierGroups.EVOLUTION);

export const classifierOptionLabel = (option?: ClassifierOption) =>
  option?.active === false ? deactivatedOptionLabel(option.value) : option?.value || '';
