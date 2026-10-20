import { isEqual } from 'lodash';
import { FormTypes, PlantAbundanceType } from '../../utils/constants';
import { CriteriaOption, CriteriaSign } from '../../types';
import { isNew } from '../../utils/functions';
import { inputLabels, pageTitles } from '../../utils/texts';

export type StoredClassifier = { id?: number | null; name?: string };

const resolveStoredOption = (
  stored: StoredClassifier,
  vocabulary: CriteriaOption[],
): CriteriaOption | undefined => {
  if (!stored.id) return undefined;

  const storedId = stored.id;

  return (
    vocabulary.find((option) => option.id === storedId) || {
      id: storedId,
      name: stored.name || '',
      value: stored.name || '',
    }
  );
};

export const getSignOptions = (
  signs: CriteriaSign[],
  stored: StoredClassifier,
  vocabulary: CriteriaOption[],
): CriteriaSign[] => {
  const option = resolveStoredOption(stored, vocabulary);

  if (!option || signs.some((sign) => sign.id === option.id)) return signs;

  return [{ ...option, stages: [] }, ...signs];
};

export const getStageOptions = (
  sign: CriteriaSign | undefined,
  stored: StoredClassifier,
  vocabulary: CriteriaOption[],
): CriteriaOption[] => {
  const stages = sign?.stages || [];
  const option = resolveStoredOption(stored, vocabulary);

  if (!option || stages.some((stage) => stage.id === option.id)) return stages;

  return [option, ...stages];
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
