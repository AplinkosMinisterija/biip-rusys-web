import { isEqual } from 'lodash';
import { FormTypes, PlantAbundanceType } from '../../utils/constants';
import { CriteriaOption, CriteriaSign } from '../../types';
import { isNew } from '../../utils/functions';
import { deactivatedOptionLabel } from '../../utils/options';
import { inputLabels, pageTitles } from '../../utils/texts';

export type StoredClassifier = { id?: number | null; name?: string };

const resolveDeactivatedOption = (
  storedId: number,
  storedName: string | undefined,
  vocabulary: CriteriaOption[],
): CriteriaOption => {
  const known = vocabulary.find((option) => option.id === storedId);

  return {
    id: storedId,
    name: known?.name || storedName || '',
    value: deactivatedOptionLabel(known?.value || storedName || ''),
  };
};

export const getSignOptions = (
  signs: CriteriaSign[],
  stored: StoredClassifier,
  vocabulary: CriteriaOption[],
): CriteriaSign[] => {
  if (!stored.id || signs.some((sign) => sign.id === stored.id)) return signs;

  return [
    { ...resolveDeactivatedOption(stored.id, stored.name, vocabulary), stages: [] },
    ...signs,
  ];
};

export const getStageOptions = (
  sign: CriteriaSign | undefined,
  stored: StoredClassifier,
  vocabulary: CriteriaOption[],
): CriteriaOption[] => {
  const stages = sign?.stages || [];

  if (!stored.id || stages.some((stage) => stage.id === stored.id)) return stages;

  return [resolveDeactivatedOption(stored.id, stored.name, vocabulary), ...stages];
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
