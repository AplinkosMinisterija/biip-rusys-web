import styled from 'styled-components';
import { device } from './../../styles';
import { CheckBox, RadioOptions } from '@aplinkosministerija/design-system';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media ${device.mobileXL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const IndividualsContainer = styled.div`
  display: flex;
  column-gap: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
  @media ${device.mobileXL} {
    flex-direction: column;
  }
`;

export const StyledSingleCheckBox = styled(CheckBox)`
  margin-top: 35px;
  @media ${device.mobileL} {
    margin-top: 0;
  }
`;

export const StyledRadioOptions = styled(RadioOptions)`
  margin-top: -2px;
  label {
    padding-right: 1px;
  }
`;
