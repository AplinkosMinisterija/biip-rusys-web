import {
  AsyncSelectField,
  CheckBox,
  DatePicker,
  TextField,
} from '@aplinkosministerija/design-system';
import { Column, Row } from '../styles';
import { ObserverDataContainerProps } from '../types';
import SimpleContainer from './../../../components/containers/SimpleContainer';
import { Sources } from '../../../types';
import { getSourcesList } from '../../../utils/functions';
import { fieldHints, formLabels, inputLabels } from '../../../utils/texts';
import { FieldHint } from '../../../components/other/FieldHint';

export const ObserverDataContainer = ({
  values,
  errors,
  handleChange,
  disabled,
}: ObserverDataContainerProps) => {
  return (
    <SimpleContainer title={formLabels.dataAboutObserver}>
      <Column>
        <Row>
          <FieldHint hint={fieldHints.observedAt} show={!disabled}>
            <DatePicker
              disabled={disabled}
              label={inputLabels.observedAt}
              value={values.observedAt}
              error={errors?.observedAt}
              bottom={true}
              maxDate={new Date()}
              name={'observedAt'}
              onChange={(observedAt?: Date) => handleChange('observedAt', observedAt)}
              ariaLabelRemove="Pašalinti datą"
            />
          </FieldHint>
          <FieldHint hint={fieldHints.observedBy} show={!disabled}>
            <TextField
              disabled={disabled}
              name={'observedBy'}
              label={inputLabels.observedBy}
              value={values.observedBy}
              error={errors?.observedBy}
              onChange={(observedBy: string) => handleChange('observedBy', observedBy)}
            />
          </FieldHint>
          <FieldHint hint={fieldHints.source} show={!disabled}>
            <AsyncSelectField
              label={inputLabels.source}
              disabled={disabled}
              value={values?.source}
              error={errors.source}
              name="source"
              onChange={(source: Sources) => {
                handleChange('source', source);
              }}
              getOptionLabel={(option) => option?.name}
              loadOptions={(input, page) => getSourcesList(input, page)}
              ariaLabelRemove="Pašalinti šaltinį"
              texts={{
                resultsCount: (count) => `${count} šaltiniai`,
                noOptions: 'Nėra rūšių pasirinkimų',
              }}
            />
          </FieldHint>
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
