import { NumericTextField, SelectField, TextField } from '@aplinkosministerija/design-system';
import { isEmpty, isEqual } from 'lodash';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../../styles';
import {
  crustaceanMethodTypeOptions,
  fishMethodTypeOptions,
  mammalMethodTypeOptions,
  molluskMethodTypeOptions,
  plantAbundanceTypeOptions,
} from '../../../utils/functions';
import { getAnimalActivityOptions, getAnimalEvolutionOptions, setPlaceholder } from '../functions';
import { SpecieActivityProps } from '../types';
import {
  FormTypes,
  MammalMethodType,
  MushroomEvolutionState,
  PlantEvolutionState,
} from './../../../utils/constants';
import {
  animalActivityLabels,
  animalEvolutionStateLabels,
  crustaceanMethodTypeLabels,
  fishMethodTypeLabels,
  inputLabels,
  mammalMethodTypeLabels,
  molluskMethodTypeLabels,
  mushroomEvolutionStateLabels,
  plantAbundanceTypeLabels,
  plantEvolutionStateLabels,
  shortMeasurementUnitsLabels,
} from './../../../utils/texts';

export const SpecieActivity = ({
  values,
  disabled,
  errors,
  setValues,
  handleChange,
}: SpecieActivityProps) => {
  const { id } = useParams();
  const formType = values?.species?.formType ? values?.species?.formType : '';
  const isAnimalKingdom = isEqual(formType, FormTypes.ENDANGERED_ANIMAL);

  const plantEvolutionOptions = useMemo(() => Object.keys(PlantEvolutionState), []);

  const mushroomEvolutionOptions = useMemo(() => Object.keys(MushroomEvolutionState), []);
  const animalActivitiesOptions = useMemo(() => getAnimalActivityOptions(), []);

  const animalEvolutionOptions = useMemo(
    () => getAnimalEvolutionOptions(values.activity),
    [values.activity],
  );

  const hasMethod =
    formType &&
    [
      FormTypes.INVASIVE_CRUSTACEAN,
      FormTypes.INVASIVE_FISH,
      FormTypes.INVASIVE_MOLLUSK,
      FormTypes.INVASIVE_MAMMAL,
      FormTypes.INVASIVE_PLANT,
    ].includes(formType);

  const showEvolutionField =
    (isAnimalKingdom && !isEmpty(animalEvolutionOptions)) ||
    (formType && [FormTypes.ENDANGERED_MUSHROOM, FormTypes.ENDANGERED_PLANT].includes(formType));

  const evolution = {
    [FormTypes.ENDANGERED_ANIMAL]: animalEvolutionOptions,
    [FormTypes.ENDANGERED_MUSHROOM]: mushroomEvolutionOptions,
    [FormTypes.ENDANGERED_PLANT]: plantEvolutionOptions,
  };
  const evolutionLabels = {
    [FormTypes.ENDANGERED_ANIMAL]: animalEvolutionStateLabels,
    [FormTypes.ENDANGERED_MUSHROOM]: mushroomEvolutionStateLabels,
    [FormTypes.ENDANGERED_PLANT]: plantEvolutionStateLabels,
  };

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

  const handleSetActivity = (e) => {
    setValues({
      ...values,
      evolution: '',
      activity: e,
    });
  };
  if (!values.species) return <></>;

  if (hasMethod)
    return (
      <Row repeat={isInvasivePlant ? '1' : '2'}>
        <SelectField
          disabled={disabled}
          label={isInvasivePlant ? inputLabels.abundance : inputLabels.method}
          value={values.method}
          error={errors.method}
          name="method"
          onChange={(e) => {
            handleChange('method', e);
            handleChange('methodValue', '');
          }}
          options={method[formType]}
          getOptionLabel={(e: string) => methodLabels[formType][e]}
        />
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
                onChange={(methodValue:number) => {
                  handleChange('methodValue', methodValue?.toString());
                }}
              />
            )}
          </>
        )}
      </Row>
    );

  return (
    <>
      {isAnimalKingdom && (
        <SelectField
          disabled={disabled}
          label={inputLabels.activity}
          value={values.activity}
          error={errors.activity}
          name={'activity'}
          onChange={(e) => handleSetActivity(e)}
          options={animalActivitiesOptions}
          getOptionLabel={(e) => animalActivityLabels[e]}
          placeholder={setPlaceholder(values.activity, id)}
        />
      )}
      {showEvolutionField && (
        <SelectField
          disabled={disabled}
          label={inputLabels.evolution}
          value={values.evolution}
          error={errors.evolution}
          name="evolution"
          onChange={(e) => {
            handleChange('evolution', e);
          }}
          options={evolution[formType]}
          getOptionLabel={(e: string) => evolutionLabels[formType][e]}
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
