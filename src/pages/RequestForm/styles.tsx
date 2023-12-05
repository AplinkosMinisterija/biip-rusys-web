import styled from 'styled-components';
import { device } from '../../styles';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const Row = styled.div`
  display: flex;
  gap: 16px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  text-align: left;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.label};
  opacity: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TypeContainer = styled.div`
  display: flex;
  gap: 16px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;
