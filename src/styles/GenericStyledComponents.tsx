import styled from 'styled-components';
import { device } from '.';

export const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;
export const ColumnOne = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 2;
  @media ${device.mobileL} {
    min-width: 100%;
  }
`;

export const ColumnTwo = styled.div`
  display: flex;
  width: 400px;
  gap: 8px;
  flex-direction: column;
  flex: 1;
  @media ${device.mobileXL} {
    min-width: 280px;
  }
  @media ${device.mobileL} {
    width: 100%;
  }
`;

export const Grid = styled.div<{ column?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ column }) => column || 2}, 1fr);
  gap: 16px;
  margin: 16px 0;
  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
