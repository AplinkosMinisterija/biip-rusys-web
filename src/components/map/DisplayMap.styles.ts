import { Button } from '@aplinkosministerija/design-system';
import styled from 'styled-components';
import { device } from '../../styles';
import Icon from '../other/Icons';

export const Container = styled.div<{
  showModal: boolean;
  error: boolean;
}>`
  width: 100%;
  height: 100%;
  ${({ showModal }) =>
    showModal &&
    `
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  overflow-y: auto;
  background-color: #0b1b607a;
  `}
  ${({ theme, error }) => error && `border: 1px solid ${theme.colors.error};`}
`;

export const InnerContainer = styled.div<{
  showModal: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ showModal }) =>
    showModal &&
    `
    padding: 16px;
  `}

  @media ${device.mobileL} {
    padding: 0;
  }
`;

export const StyledIframe = styled.iframe<{
  height: string;
  width: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 0;
`;

export const StyledButton = styled(Button)<{ popup: boolean }>`
  position: absolute;
  z-index: 10;
  right: ${({ popup }) => (popup ? 28 : 11)}px;
  top: ${({ popup }) => (popup ? 28 : 15)}px;
  width: 28px;
  height: 28px;
  padding: 0;
  background-color: white;

  @media ${device.mobileL} {
    top: 80px;
    right: 10px;
  }

  button {
    border-color: #e5e7eb;
    background-color: white !important;
    width: 30px;
    height: 30px;
    padding: 0;
    box-shadow: 0 18px 41px #121a5529;
  }
`;

export const StyledIcon = styled(Icon)`
  font-size: 3rem;
  color: #6b7280;
`;

export const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.label`
  position: relative;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
`;
