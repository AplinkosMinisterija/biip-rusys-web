import { map } from 'lodash';
import api from '../api';
import { CriteriaOption } from '../types';
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
  mammalMethodTypeLabels,
  molluskMethodTypeLabels,
  inputLabels,
  plantAbundanceTypeLabels,
} from './texts';

// A retired value is still shown, so it has to read apart from the one that replaced it: the two
// vocabulary generations share four labels, and design-system 1.4.7 drops onChange when the
// clicked option's label equals the current one.
export const classifierLabel = (option?: CriteriaOption): string =>
  option?.active === false
    ? `${option.value} (${inputLabels.deactivatedOption})`
    : option?.value || '';

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

export const getCriteriaOptionsList =
  (group: ClassifierGroups) => async (input: string, page: number | string) =>
    await api.getCriteriaOptionsPage(group, input, page);

export const getActivityOptionsList = getCriteriaOptionsList(ClassifierGroups.ACTIVITY);

export const getEvolutionOptionsList = getCriteriaOptionsList(ClassifierGroups.EVOLUTION);
