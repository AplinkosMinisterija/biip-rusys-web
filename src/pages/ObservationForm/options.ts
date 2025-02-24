import { FormNoQuantityReason } from '../../types';
import { formNoQuantityReasonLabels } from '../../utils/texts';

export const noQuantityOptions = [
  { value: FormNoQuantityReason.CLEANUP, label: formNoQuantityReasonLabels.CLEANUP },
  { value: FormNoQuantityReason.RESEARCH, label: formNoQuantityReasonLabels.RESEARCH },
];
