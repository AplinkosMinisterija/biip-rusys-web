import { isEqual } from 'lodash';
import { FormTypes, PlantAbundanceType } from '../../utils/constants';
import { CriteriaOption, CriteriaSign } from '../../types';
import { isNew } from '../../utils/functions';
import { deactivatedOptionLabel } from '../../utils/options';
import { inputLabels, pageTitles } from '../../utils/texts';

const asOffered = (option: CriteriaOption): CriteriaOption => ({
  ...option,
  value: deactivatedOptionLabel(option.value),
});

export const getSignOptions = (
  signs: CriteriaSign[],
  storedId: number | null | undefined,
  stored?: CriteriaOption,
): CriteriaSign[] => {
  if (!storedId || stored?.id !== storedId || signs.some((sign) => sign.id === storedId)) {
    return signs;
  }

  return [{ ...asOffered(stored), stages: [] }, ...signs];
};

export const getStageOptions = (
  sign: CriteriaSign | undefined,
  storedId: number | null | undefined,
  stored?: CriteriaOption,
): CriteriaOption[] => {
  const stages = sign?.stages || [];

  if (!storedId || stored?.id !== storedId || stages.some((stage) => stage.id === storedId)) {
    return stages;
  }

  return [asOffered(stored), ...stages];
};

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
