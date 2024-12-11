import { addDays } from 'date-fns';
import { isEqual } from 'lodash';
import { RequestTypes } from '../../../utils/constants';
import { inputLabels } from '../../../utils/texts';
import { AdditionalFieldsByFormTypeProps } from '../types';
import { CheckBox, DatePicker } from '@aplinkosministerija/design-system';

export const AdditionalFieldsByFormType = ({
  values,
  errors,
  disabled,
  handleChange,
}: AdditionalFieldsByFormTypeProps) => {
  if (isEqual(values.type, RequestTypes.GET_ONCE))
    return (
      <>
        <DatePicker
          disabled={disabled}
          label={inputLabels.receiveDate}
          maxDate={new Date()}
          value={values.receiveDate}
          error={errors.receiveDate}
          onChange={(date) => {
            handleChange(`receiveDate`, date);
          }}
        />
        <CheckBox
          disabled={disabled}
          label={inputLabels.exactCoordinates}
          value={values.exactCoordinates}
          error={!!errors?.exactCoordinates}
          onChange={(value) => handleChange(`exactCoordinates`, value)}
        />
      </>
    );

  if (isEqual(values.type, RequestTypes.GET))
    return (
      <DatePicker
        disabled={disabled}
        label={inputLabels.accessDate}
        value={values.accessDate}
        error={errors.accessDate}
        minDate={addDays(new Date(), 7)}
        onChange={(date) => {
          handleChange(`accessDate`, date);
        }}
      />
    );

  return <></>;
};
