import { NumericTextField, TextAreaField } from '@aplinkosministerija/design-system';
import { isEmpty, isEqual } from 'lodash';
import { MeasurementUnit } from '../../../components/other/MeasurmentUnit';
import { getShowNoQuantityReasonField } from '../functions';
import { noQuantityOptions } from '../options';
import { Column, IndividualsContainer, StyledRadioOptions, StyledSingleCheckBox } from '../styles';
import { ObservedSpecieDataContainerProps } from '../types';
import SimpleContainer from './../../../components/containers/SimpleContainer';
import { FormTypes, MeasurementUnits } from './../../../utils/constants';
import { formLabels, inputLabels } from './../../../utils/texts';
import { SpecieActivity } from './SpecieActivity';
import { TransectInfoFields } from './TransectInfoFields';

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

  const isInvasiveFormType =
    formType &&
    [
      FormTypes.INVASIVE_CRUSTACEAN,
      FormTypes.INVASIVE_FISH,
      FormTypes.INVASIVE,
      FormTypes.INVASIVE_MOLLUSK,
      FormTypes.INVASIVE_MAMMAL,
      FormTypes.INVASIVE_PLANT,
    ].includes(formType);

  const isInvasivePlant = isEqual(FormTypes.INVASIVE_PLANT, values?.species?.formType);

  const showNoQuantityReasonField = getShowNoQuantityReasonField(isInvasiveFormType, values);

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
              onChange={(quantity: number) => {
                handleChange('quantity', quantity?.toString());
                handleChange('noQuantityReason', undefined);
              }}
            />
            {showNoQuantityReasonField && (
              <StyledRadioOptions
                value={values.noQuantityReason}
                disabled={disabled}
                label={' '}
                options={noQuantityOptions}
                error={errors.noQuantityReason}
                onChange={(option) => handleChange('noQuantityReason', option)}
              />
            )}
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
