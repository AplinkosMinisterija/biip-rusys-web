import { Button } from '@aplinkosministerija/design-system';
import styled from 'styled-components';

import Icon from '../../../components/other/Icons';
import { device } from '../../../styles';

export const Container = styled.div<{
  showModal: boolean;
  error: boolean;
}>`
  width: 100%;
  ${({ showModal }) =>
    showModal &&
    `
  height: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0b1b607a;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 1001;
  
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
  min-width: 28px;

  height: 28px;
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
