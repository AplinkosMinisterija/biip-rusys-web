import { isEqual } from 'lodash';
import {
  AnimalActivity,
  AnimalEvolutionState,
  FormTypes,
  PlantAbundanceType,
  PlantEvolutionState,
} from '../../utils/constants';
import { isNew } from '../../utils/functions';
import { inputLabels, pageTitles } from '../../utils/texts';

export const setPlaceholder = (value, id) =>
  !value && !isNew(id) ? inputLabels.noData : inputLabels.chooseOption;

export const title = (disabled: boolean, id: string) => {
  if (disabled) return pageTitles.formReview;
  if (isNew(id)) return pageTitles.newForm;

  return pageTitles.updateForm;
};

export const getAnimalPlantOptions = (formType: FormTypes) => {
  const isMushroomKingdom = isEqual(formType, FormTypes.ENDANGERED_MUSHROOM);

  return Object.keys(PlantEvolutionState).filter((evolution) => {
    if (isEqual(evolution, PlantEvolutionState.GROWING)) {
      return isMushroomKingdom;
    }
    return true;
  });
};

export const getAnimalActivityOptions = () => Object.keys(AnimalActivity);

export const getAnimalEvolutionOptions = (activity?: AnimalActivity) =>
  Object.keys(AnimalEvolutionState).filter((evolution) => {
    if (isEqual(activity, AnimalActivity.HABITATION)) {
      return true;
    }

    const showAgeOptions =
      activity && [AnimalActivity.OBSERVED_ALIVE, AnimalActivity.OTHER].includes(activity);

    if (showAgeOptions) {
      return [AnimalEvolutionState.IMMATURE, AnimalEvolutionState.MATURE].includes(
        evolution as AnimalEvolutionState,
      );
    }

    return false;
  });

export const getMapPath = (disabled = false, authToken?: string) => {
  const param = new URLSearchParams();
  const path = '/edit';

  if (authToken) {
    param.append('auth', authToken);
  }

  if (disabled) {
    param.append('preview', 'true');
  } else {
    param.append('showArea', 'true');
    param.append('buffer', 'true');
  }

  return `${path}?${param}`;
};

export const getIsInvasivePlant = (species) => isEqual(FormTypes.INVASIVE_PLANT, species?.formType);

export const getShowNoQuantityReasonField = (isInvasiveFormType, values) => {
  return getIsInvasivePlant(values?.species)
    ? values.method === PlantAbundanceType.VALUE_0
    : isInvasiveFormType && parseInt(values?.quantity) === 0;
};
