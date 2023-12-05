import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { Url } from '../../utils/constants';
import Button from '../buttons/Button';
import Icon from '../other/Icons';

export interface MapProps {
  height?: string;
  onSave?: (data: any) => void;
  onClose?: () => void;
  error?: string;
  queryString?: string;
  value?: string;
}

const DrawMap = ({ height, onSave, error = '', onClose, queryString = '', value }: MapProps) => {
  const [showModal, setShowModal] = useState(false);
  const iframeRef = useRef<any>(null);

  const src = `${Url.DRAW}${queryString}`;

  const handleLoadMap = () => {
    if (!value) return;

    iframeRef?.current?.contentWindow?.postMessage({ geom: value }, '*');
  };

  const handleSaveGeom = useCallback(
    (event) => {
      if (!event?.data?.mapIframeMsg) return;

      const data = JSON.parse(event?.data?.mapIframeMsg?.data);

      if (!data) return;

      onSave && onSave(data);
    },
    [onSave],
  );

  useEffect(() => {
    window.addEventListener('message', handleSaveGeom);
    return () => window.removeEventListener('message', handleSaveGeom);
  }, [handleSaveGeom]);

  return (
    <>
      <Container showModal={showModal} error={error}>
        <InnerContainer showModal={showModal}>
          <StyledButton
            aria-label={'keisti žemėlapio dydį'}
            popup={showModal}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onClose) {
                return onClose();
              }

              setShowModal(!showModal);
            }}
          >
            <StyledIconContainer>
              <StyledIcon name={showModal ? 'exitFullScreen' : 'fullscreen'} />
            </StyledIconContainer>
          </StyledButton>
          <StyledIframe
            allow="geolocation *"
            title={'Radavietės pažymėjimo žemėlapis'}
            ref={iframeRef}
            src={src}
            width={'100%'}
            height={showModal ? '100%' : `${height || '230px'}`}
            style={{ border: 0 }}
            allowFullScreen={true}
            onLoad={handleLoadMap}
            aria-hidden="false"
            tabIndex={1}
          />
        </InnerContainer>
      </Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

const Container = styled.div<{
  showModal: boolean;
  error: string;
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

const InnerContainer = styled.div<{
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

const StyledIframe = styled.iframe<{
  height: string;
  width: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const StyledButton = styled(Button)<{ popup: boolean }>`
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
    box-shadow: 0px 18px 41px #121a5529;
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 3rem;
  color: #6b7280;
`;

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.label`
  position: relative;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
`;

export default DrawMap;
