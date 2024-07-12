import { Column, Row } from '../styles';
import { ObserverDataContainerProps } from '../types';
import CheckBox from './../../../components/buttons/CheckBox';
import SimpleContainer from './../../../components/containers/SimpleContainer';
import AsyncSelectField from './../../../components/fields/AsyncSelectField';
import { Sources } from './../../../types';
import { getSourcesList, isNew } from './../../../utils/functions';
import { formLabels, inputLabels } from './../../../utils/texts';
import { DatePicker, TextField } from '@aplinkosministerija/design-system';

export const ObserverDataContainer = ({
  values,
  errors,
  handleChange,
  disabled,
  id,
}: ObserverDataContainerProps) => {
  return (
    <SimpleContainer title={formLabels.dataAboutObserver}>
      <Column>
        <Row>
          <DatePicker
            disabled={disabled}
            label={inputLabels.observedAt}
            value={values.observedAt}
            error={errors?.observedAt}
            bottom={true}
            maxDate={new Date()}
            name={'observedAt'}
            onChange={(observedAt?: Date) => handleChange('observedAt', observedAt)}
          />
          <TextField
            disabled={disabled}
            name={'observedBy'}
            label={inputLabels.observedBy}
            value={values.observedBy}
            error={errors?.observedBy}
            onChange={(observedBy: string) => handleChange('observedBy', observedBy)}
          />
          <AsyncSelectField
            label={inputLabels.source}
            disabled={!isNew(id)}
            value={values?.source}
            error={errors.source}
            name="source"
            onChange={(source: Sources) => {
              handleChange('source', source);
            }}
            getOptionLabel={(option) => option?.name}
            loadOptions={(input, page) => getSourcesList(input, page)}
          />
        </Row>
        <CheckBox
          disabled={disabled}
          label={inputLabels.correctInformation}
          value={values.isCorrectFormInformation}
          error={!!errors?.isCorrectFormInformation}
          onChange={(value) => handleChange('isCorrectFormInformation', value)}
        />
      </Column>
    </SimpleContainer>
  );
};
