import { map } from 'lodash';
import {
  AnimalActivity,
  AnimalEvolutionState,
  CrustaceanMethodType,
  FishMethodType,
  MammalMethodType,
  MolluskMethodType,
  MushroomEvolutionState,
  PlantAbundanceType,
  PlantEvolutionState,
} from './constants';
import {
  animalActivityLabels,
  animalEvolutionStateLabels,
  crustaceanMethodTypeLabels,
  fishMethodTypeLabels,
  mammalMethodTypeLabels,
  molluskMethodTypeLabels,
  mushroomEvolutionStateLabels,
  plantAbundanceTypeLabels,
  plantEvolutionStateLabels,
} from './texts';

const methodLabels = {
  ...fishMethodTypeLabels,
  ...molluskMethodTypeLabels,
  ...crustaceanMethodTypeLabels,
  ...mammalMethodTypeLabels,
  ...plantAbundanceTypeLabels,
};

const evolutionLabels = {
  ...animalEvolutionStateLabels,
  ...mushroomEvolutionStateLabels,
  ...plantEvolutionStateLabels,
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

export const getEvolutionOptions = () =>
  map(
    [
      ...new Set([
        ...Object.keys(AnimalEvolutionState),
        ...Object.keys(MushroomEvolutionState),
        ...Object.keys(PlantEvolutionState),
      ]),
    ],
    (Status) => ({
      id: Status,
      label: evolutionLabels[Status],
    }),
  );

export const getActivities = () =>
  map(AnimalActivity, (Status) => ({
    id: Status,
    label: animalActivityLabels[Status],
  }));
