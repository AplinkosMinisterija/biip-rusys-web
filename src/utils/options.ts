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
  plantAbundanceTypeLabels,
} from './texts';

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
