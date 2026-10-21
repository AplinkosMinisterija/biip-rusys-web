import { NumericTextField, SelectField, TextField } from '@aplinkosministerija/design-system';
import { isEmpty, isEqual } from 'lodash';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../../styles';
import { CriteriaOption, CriteriaSign } from '../../../types';
import {
  crustaceanMethodTypeOptions,
  fishMethodTypeOptions,
  mammalMethodTypeOptions,
  molluskMethodTypeOptions,
  plantAbundanceTypeOptions,
} from '../../../utils/functions';
import {
  getShowNoQuantityReasonField,
  getSignOptions,
  getStageOptions,
  setPlaceholder,
} from '../functions';
import { noQuantityOptions } from '../options';
import { StyledRadioOptions } from '../styles';
import { SpecieActivityProps } from '../types';
import { FormTypes, MammalMethodType } from '../../../utils/constants';
import {
  crustaceanMethodTypeLabels,
  fishMethodTypeLabels,
  inputLabels,
  mammalMethodTypeLabels,
  molluskMethodTypeLabels,
  plantAbundanceTypeLabels,
  shortMeasurementUnitsLabels,
} from '../../../utils/texts';

export const SpecieActivity = ({
  values,
  disabled,
  errors,
  setValues,
  handleChange,
  criteria,
  storedSign,
  storedStage,
}: SpecieActivityProps) => {
  const { id } = useParams();
  const formType = values?.species?.formType ? values?.species?.formType : '';

  const hasMethod =
    formType &&
    [
      FormTypes.INVASIVE_CRUSTACEAN,
      FormTypes.INVASIVE_FISH,
      FormTypes.INVASIVE_MOLLUSK,
      FormTypes.INVASIVE_MAMMAL,
      FormTypes.INVASIVE_PLANT,
    ].includes(formType);

  const method = {
    [FormTypes.INVASIVE_FISH]: fishMethodTypeOptions,
    [FormTypes.INVASIVE_MOLLUSK]: molluskMethodTypeOptions,
    [FormTypes.INVASIVE_CRUSTACEAN]: crustaceanMethodTypeOptions,
    [FormTypes.INVASIVE_MAMMAL]: mammalMethodTypeOptions,
    [FormTypes.INVASIVE_PLANT]: plantAbundanceTypeOptions,
  };

  const methodLabels = {
    [FormTypes.INVASIVE_FISH]: fishMethodTypeLabels,
    [FormTypes.INVASIVE_MOLLUSK]: molluskMethodTypeLabels,
    [FormTypes.INVASIVE_CRUSTACEAN]: crustaceanMethodTypeLabels,
    [FormTypes.INVASIVE_MAMMAL]: mammalMethodTypeLabels,
    [FormTypes.INVASIVE_PLANT]: plantAbundanceTypeLabels,
  };

  const mammalsMethodValueInfo = {
    [MammalMethodType.ACCOUNTING]: {
      label: inputLabels.area,
      measurementUnit: shortMeasurementUnitsLabels.KILOMETERS,
    },
    [MammalMethodType.SURVEY]: {
      label: inputLabels.respondentsNumber,
      measurementUnit: inputLabels.quantity,
      wholeNumber: true,
    },
    [MammalMethodType.OBSERVATION]: { label: '', measurementUnit: '' },

    [MammalMethodType.CAMERA]: {
      label: inputLabels.daysNumber,
      measurementUnit: '',
      wholeNumber: true,
    },
    [MammalMethodType.TRAP]: {
      label: inputLabels.daysNumberTrapsNumber,
      measurementUnit: '',
      wholeNumber: true,
    },
    [MammalMethodType.DEAD_INDIVIDUALS_REGISTRATION]: {
      label: inputLabels.drivenDistance,
      measurementUnit: shortMeasurementUnitsLabels.KILOMETERS,
    },
    [MammalMethodType.OTHER]: {
      label: inputLabels.specifyOtherMethod,
      measurementUnit: '',
    },
  };

  const isOtherMethod = isEqual(MammalMethodType.OTHER, values.method);

  const methodValue = values.method ? mammalsMethodValueInfo?.[values.method] : '';

  const isInvasivePlant = isEqual(FormTypes.INVASIVE_PLANT, values?.species?.formType);

  const showMethodValue =
    (methodValue?.label && isEqual(FormTypes.INVASIVE_MAMMAL, values?.species?.formType)) ||
    isOtherMethod;

  if (!values.species) return <></>;

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

  const showNoQuantityReasonField = getShowNoQuantityReasonField(isInvasiveFormType, values);

  if (hasMethod)
    return (
      <Row repeat={!showNoQuantityReasonField && isInvasivePlant ? '1' : '2'}>
        <SelectField
          disabled={disabled}
          label={isInvasivePlant ? inputLabels.abundance : inputLabels.method}
          value={values.method}
          error={errors.method}
          name="method"
          onChange={(e) => {
            handleChange('method', e);
            handleChange('methodValue', '');
            handleChange('noQuantityReason', undefined);
          }}
          options={method[formType]}
          getOptionLabel={(e: string) => methodLabels[formType][e]}
        />
        {isInvasivePlant && showNoQuantityReasonField && (
          <StyledRadioOptions
            value={values.noQuantityReason}
            disabled={disabled}
            label={' '}
            options={noQuantityOptions}
            error={errors.noQuantityReason}
            onChange={(option) => handleChange('noQuantityReason', option)}
          />
        )}
        {showMethodValue && (
          <>
            {isOtherMethod ? (
              <TextField
                disabled={disabled}
                height={40}
                label={methodValue?.label}
                value={values.methodValue}
                error={errors?.methodValue}
                name={'methodValue'}
                onChange={(e) => {
                  handleChange('methodValue', e);
                }}
              />
            ) : (
              <NumericTextField
                disabled={disabled}
                height={40}
                name={'methodValue'}
                label={methodValue?.label}
                wholeNumber={methodValue?.wholeNumber}
                value={values.methodValue}
                right={
                  methodValue?.measurementUnit && (
                    <MeasurementUnit>{methodValue?.measurementUnit}</MeasurementUnit>
                  )
                }
                error={errors?.methodValue}
                onChange={(methodValue: number) => {
                  handleChange('methodValue', methodValue?.toString());
                }}
              />
            )}
          </>
        )}
      </Row>
    );

  const signOptions = getSignOptions(criteria.signs, values.activity, storedSign);
  const selectedSign = signOptions.find((sign) => sign.id === values.activity);

  const stageOptions = getStageOptions(selectedSign, values.evolution, storedStage);
  const selectedStage = stageOptions.find((stage) => stage.id === values.evolution);

  // A stage is only ever offered through a sign, so a new sign invalidates the stored one.
  const handleSetSign = (sign?: CriteriaSign) =>
    setValues({ ...values, activity: sign?.id ?? null, evolution: null });

  const handleSetStage = (stage?: CriteriaOption) =>
    setValues({ ...values, evolution: stage?.id ?? null });

  return (
    <>
      {!isEmpty(signOptions) && (
        <SelectField
          disabled={disabled}
          label={inputLabels.activity}
          value={selectedSign}
          error={errors.activity}
          name="activity"
          onChange={handleSetSign}
          options={signOptions}
          getOptionLabel={(option: CriteriaOption) => option.value}
          placeholder={setPlaceholder(values.activity, id)}
        />
      )}
      {!isEmpty(stageOptions) && (
        <SelectField
          disabled={disabled}
          label={inputLabels.evolution}
          value={selectedStage}
          error={errors.evolution}
          name="evolution"
          onChange={handleSetStage}
          options={stageOptions}
          getOptionLabel={(option: CriteriaOption) => option.value}
          placeholder={setPlaceholder(values.evolution, id)}
        />
      )}
    </>
  );
};

const Row = styled.div<{ repeat?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ repeat }) => repeat}, 1fr);
  gap: 16px;
  @media ${device.mobileXL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MeasurementUnit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #606773;
  margin-right: 13px;
`;
