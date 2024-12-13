import { Button } from '@aplinkosministerija/design-system';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { createSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import api from '../../api';
import { device } from '../../styles';
import { Url } from '../../utils/constants';
import { handleErrorFromServerToast } from '../../utils/functions';
import Icon from '../other/Icons';
import LoaderComponent from '../other/LoaderComponent';

export interface MapProps {
  height?: string;
  error?: string;
  places?: (string | undefined)[];
  fullScreen?: boolean;
}
const cookies = new Cookies();

const DisplayMap = ({ height, error, places = [], fullScreen = false }: MapProps) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<any>(null);
  const mapToken = cookies.get('mapToken');
  const [queryString, setQueryString] = useState('');
  const queryClient = useQueryClient();

  const fullUrl = `${Url.SPECIES}?${queryString}`;

  const { isFetching } = useQuery(['mapToken'], () => api.getMapToken(), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: ({ token, expires }) => {
      if (!token) return;

      cookies.set('mapToken', `${token}`, {
        path: '/',
        expires: new Date(expires),
      });
    },
    enabled: !mapToken,
  });

  useEffect(() => {
    if (isFetching || !mapToken) return;

    const queryString = createSearchParams();
    queryString.append('auth', mapToken);
    queryString.append('amateur', 'true');
    setQueryString(queryString.toString());
  }, [mapToken, isFetching]);

  const handleLoadMap = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef?.current?.contentWindow.postMessage(
      JSON.stringify({
        eventName: 'filterFeatures',
        places,
      }),
      '*',
    );
  }, [iframeRef, places]);

  const showFullScreen = fullScreen || showModal;

  const handleToggle = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const handleSaveGeom = useCallback(
    async (event) => {
      const isValidToken = event?.data?.mapIframeMsg?.auth?.valid;

      if (!isValidToken) {
        await queryClient.invalidateQueries(['mapToken']);
      }
    },
    [queryClient],
  );

  useEffect(() => {
    window.addEventListener('message', handleSaveGeom);
    return () => window.removeEventListener('message', handleSaveGeom);
  }, [handleSaveGeom]);

  if (isFetching) {
    return <LoaderComponent />;
  }

  return (
    <>
      {loading && <LoaderComponent />}
      <Container
        role={showFullScreen ? 'dialog' : undefined}
        aria-modal={showFullScreen}
        showModal={showFullScreen}
        error={!!error}
      >
        <InnerContainer showModal={showFullScreen}>
          <StyledButton
            popup={showFullScreen}
            type="button"
            onClick={handleToggle}
            aria-label={showFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            <StyledIconContainer>
              <StyledIcon name={showFullScreen ? 'exitFullScreen' : 'fullscreen'} />
            </StyledIconContainer>
          </StyledButton>

          <StyledIframe
            allow="geolocation *"
            title={'Radaviečių žemėlapis'}
            ref={iframeRef}
            src={fullUrl.toString()}
            width="100%"
            height={showFullScreen ? '100%' : `${height || '230px'}`}
            style={{ border: 0 }}
            allowFullScreen
            onLoad={handleLoadMap}
            aria-hidden="false"
            tabIndex={0}
          />
        </InnerContainer>
      </Container>
      {error && (
        <ErrorMessage aria-live="assertive" role="alert">
          {error}
        </ErrorMessage>
      )}
    </>
  );
};

const Container = styled.div<{
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

export default DisplayMap;
