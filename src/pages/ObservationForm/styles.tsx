import styled from 'styled-components';
import { device } from './../../styles';
import { CheckBox } from '@aplinkosministerija/design-system';

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
  gap: 16px;
  padding-bottom: 0;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

export const StyledSingleCheckBox = styled(CheckBox)`
  margin-top: 35px;
  @media ${device.mobileL} {
    margin-top: 0;
  }
`;
