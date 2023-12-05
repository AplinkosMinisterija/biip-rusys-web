import styled from 'styled-components';
import { MeasurementUnit } from '../../../components/other/MeasurmentUnit';
import { device } from '../../../styles';
import { TransectInfoFieldsProps } from '../types';
import ButtonsGroup from './../../../components/buttons/ButtonsGroup';
import NumericTextField from './../../../components/fields/NumericTextField';
import { MeasurementUnits } from './../../../utils/constants';
import {
  inputLabels,
  measurementUnitsLabels,
  shortMeasurementUnitsLabels,
} from './../../../utils/texts';

export const TransectInfoFields = ({
  disabled,
  handleChange,
  transect,
  errors,
}: TransectInfoFieldsProps) => {
  if (!transect) return <></>;

  const { unit, height, width } = transect;

  return (
    <UnitContainer>
      <ButtonsGroup
        label={inputLabels.measurementUnits}
        disabled={disabled}
        options={Object.keys(MeasurementUnits).slice(0, 2)}
        onChange={(e) => {
          handleChange('transect.unit', e);
        }}
        isSelected={(option) => option === unit}
        getOptionLabel={(option) => measurementUnitsLabels[option]}
      />
      <NumericTextField
        disabled={disabled}
        label={inputLabels.length}
        value={height}
        rightIcon={<MeasurementUnit unit={shortMeasurementUnitsLabels[unit]} />}
        error={errors?.height}
        name={'height'}
        onChange={(height) => {
          handleChange('transect.height', height);
        }}
      />
      <NumericTextField
        disabled={disabled}
        label={inputLabels.width}
        value={width}
        rightIcon={<MeasurementUnit unit={shortMeasurementUnitsLabels[unit]} />}
        error={errors?.width}
        name={'width'}
        onChange={(width) => {
          handleChange('transect.width', width);
        }}
      />
    </UnitContainer>
  );
};

const UnitContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1fr) repeat(2, minmax(100px, 1fr));
  gap: 16px;
  padding-top: 16px;
  @media ${device.mobileM} {
    display: flex;
    flex-direction: column;
  }
`;
