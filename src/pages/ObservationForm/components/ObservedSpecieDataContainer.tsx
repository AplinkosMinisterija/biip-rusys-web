import { isEmpty, isEqual } from 'lodash';
import { MeasurementUnit } from '../../../components/other/MeasurmentUnit';
import { Column, IndividualsContainer, StyledSingleCheckBox } from '../styles';
import { ObservedSpecieDataContainerProps } from '../types';
import SimpleContainer from './../../../components/containers/SimpleContainer';
import { FormTypes, MeasurementUnits } from './../../../utils/constants';
import { formLabels, inputLabels } from './../../../utils/texts';
import { SpecieActivity } from './SpecieActivity';
import { TransectInfoFields } from './TransectInfoFields';
import { NumericTextField, TextAreaField } from '@aplinkosministerija/design-system';

export const ObservedSpecieDataContainer = ({
  values,
  errors,
  handleChange,
  disabled,
  setValues,
}: ObservedSpecieDataContainerProps) => {
  const formType = values?.species?.formType;
  const handleSetTransect = () => {
    if (values?.transect) {
      handleChange('transect', undefined);
    } else {
      handleChange('transect', {
        unit: MeasurementUnits.CENTIMETER,
        width: '',
        height: '',
      });
    }
  };

  const hasTransect =
    formType &&
    [
      FormTypes.ENDANGERED_ANIMAL,
      FormTypes.ENDANGERED_MUSHROOM,
      FormTypes.ENDANGERED_PLANT,
    ].includes(formType);

  const isInvasivePlant = isEqual(FormTypes.INVASIVE_PLANT, values?.species?.formType);

  return (
    <SimpleContainer title={formLabels.informationAboutObservedSpecieIndividuals}>
      <Column>
        {!isInvasivePlant && (
          <IndividualsContainer>
            <NumericTextField
              disabled={disabled}
              label={inputLabels.observedSpecieIndividualsQuantity}
              value={values.quantity}
              right={<MeasurementUnit unit={inputLabels.quantity} />}
              error={errors.quantity}
              name={'quantity'}
              onChange={(e: string) => {
                handleChange('quantity', e);
              }}
            />
            {hasTransect && (
              <StyledSingleCheckBox
                disabled={disabled}
                label={inputLabels.partWatchArea}
                value={!isEmpty(values.transect)}
                onChange={handleSetTransect}
              />
            )}
          </IndividualsContainer>
        )}
        <TransectInfoFields
          disabled={disabled}
          handleChange={handleChange}
          transect={values.transect}
          errors={errors.transect}
        />
        <SpecieActivity
          values={values}
          disabled={disabled}
          errors={errors}
          setValues={setValues}
          handleChange={handleChange}
        />
        <TextAreaField
          disabled={disabled}
          label={inputLabels.observationBiotope}
          value={values.description}
          rows={2}
          name={'description'}
          onChange={(e: string) => handleChange('description', e)}
          error={errors?.description}
        />
      </Column>
    </SimpleContainer>
  );
};
