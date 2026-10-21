import { isEqual } from 'lodash';
import { FormTypes, PlantAbundanceType } from '../../utils/constants';
import { CriteriaOption, CriteriaSign } from '../../types';
import { isNew } from '../../utils/functions';
import { deactivatedOptionLabel } from '../../utils/options';
import { inputLabels, pageTitles } from '../../utils/texts';

// A retired value is the select's value but never one of its options, and design-system 1.4.7
// suppresses onChange when the clicked option's label equals the current one.
export const storedClassifier = (stored?: CriteriaOption): CriteriaOption | null =>
  stored ? { ...stored, value: deactivatedOptionLabel(stored.value) } : null;

export const getStageOptions = (
  signs: CriteriaSign[],
  activity?: CriteriaOption | null,
): CriteriaOption[] => signs.find((sign) => sign.id === activity?.id)?.stages || [];

export const setPlaceholder = (value, id) =>
  !value && !isNew(id) ? inputLabels.noData : inputLabels.chooseOption;

export const title = (disabled: boolean, id: string) => {
  if (disabled) return pageTitles.formReview;
  if (isNew(id)) return pageTitles.newForm;

  return pageTitles.updateForm;
};

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
