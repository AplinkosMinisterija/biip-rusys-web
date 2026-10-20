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

// Two vocabulary generations share labels (Kiaušinis, Lėliukė, Suaugęs individas, Jaunas…), and
// the design-system SelectField drops onChange when the clicked option's label equals the current
// one — so an unmarked pair makes the live option unselectable and the filter chips ambiguous.
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
  // A filter sends the code, and the legacy vocabulary seeded GROWING once per form type; keeping
  // the older row of a repeated code preserves the label these lists showed before.
  uniqBy(
    options.filter((option) => option.group === group),
    'name',
  ).map((option) => ({
    id: option.name,
    label: option.active ? option.value : deactivatedOptionLabel(option.value),
  }));
