import styled from 'styled-components';
import { device } from '../../../styles';
import { getSpeciesTypes } from '../../../utils/functions';
import { inputLabels, speciesTypeLabels } from '../../../utils/texts';
import { InnerContainer } from '../styles';
import { SpeciesTypeContainerProps } from '../types';
import { ButtonsGroup, FieldWrapper } from '@aplinkosministerija/design-system';

export const SpeciesTypeContainer = ({
  disabled,
  speciesTypes,
  handleChange,
}: SpeciesTypeContainerProps) => {
  const speciesType = getSpeciesTypes();

  return (
    <InnerContainer>
      <FieldWrapper label={inputLabels.speciesType}>
        <Row>
          <ButtonsGroup
            disabled={disabled}
            options={speciesType}
            onChange={(specieType) => handleChange('speciesTypes', [specieType])}
            isSelected={(option) => speciesTypes.includes(option)}
            getOptionLabel={(option) => speciesTypeLabels[option]}
          />
        </Row>
      </FieldWrapper>
    </InnerContainer>
  );
};

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;
