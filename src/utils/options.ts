import { map, uniqBy } from 'lodash';
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

export const getClassifierFilterOptions = (options: ClassifierOption[], group: ClassifierGroups) =>
  // A filter sends the code, and the legacy vocabulary seeded GROWING once per form type; keeping
  // the older row of a repeated code preserves the label these lists showed before.
  uniqBy(
    options.filter((option) => option.group === group),
    'name',
  ).map((option) => ({ id: option.name, label: option.value }));
