import { isEqual } from 'lodash';
import {
  AnimalActivity,
  AnimalEvolutionState,
  FormTypes,
  PlantEvolutionState,
} from './../../utils/constants';
import { isNew } from './../../utils/functions';
import { inputLabels, pageTitles } from './../../utils/texts';

export const setPlaceholder = (value, id) =>
  !value && !isNew(id) ? inputLabels.noData : inputLabels.chooseOption;

export const title = (disabled: boolean, id: string) => {
  if (disabled) return pageTitles.formReview;
  if (isNew(id)) return pageTitles.newForm;

  return pageTitles.updateForm;
};

export const getAnimalPlantOptions = (formType: FormTypes) => {
  const isMushroomKingdom = isEqual(formType, FormTypes.ENDANGERED_MUSHROOM);

  const plantEvolutionOptions = Object.keys(PlantEvolutionState).filter((evolution) => {
    if (isEqual(evolution, PlantEvolutionState.GROWING)) {
      return isMushroomKingdom;
    }
    return true;
  });

  return plantEvolutionOptions;
};

export const getAnimalActivityOptions = () => Object.keys(AnimalActivity);

export const getAnimalEvolutionOptions = (activity?: AnimalActivity) =>
  Object.keys(AnimalEvolutionState).filter((evolution: any) => {
    if (isEqual(activity, AnimalActivity.HABITATION)) {
      return true;
    }

    const showAgeOptions =
      activity && [AnimalActivity.OBSERVED_ALIVE, AnimalActivity.OTHER].includes(activity);

    if (showAgeOptions) {
      const AgeOptions = [AnimalEvolutionState.IMMATURE, AnimalEvolutionState.MATURE].includes(
        evolution,
      );

      return AgeOptions;
    }

    return false;
  });

export const getMapPath = (disabled = false) => {
  const param = new URLSearchParams();
  let path = '/edit';

  if (disabled) {
    param.append('preview', 'true');
  } else {
    param.append('buffer', 'true');
  }

  return `${path}?${param}`;
};
