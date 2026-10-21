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

export const getClassifierFilterOptions = (options: ClassifierOption[], group: ClassifierGroups) =>
  // Legacy seeded GROWING once per form type; the older row preserves the label these lists showed.
  uniqBy(
    options.filter((option) => option.group === group),
    'name',
  ).map((option) => ({
    id: option.name,
    label: option.active ? option.value : deactivatedOptionLabel(option.value),
  }));
