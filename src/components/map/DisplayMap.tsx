import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ButtonVariants } from '../../styles';
import { Url } from '../../utils/constants';
import { useMapToken } from '../../utils/hooks';
import LoaderComponent from '../other/LoaderComponent';
import {
  ErrorMessage,
  InnerContainer,
  StyledButton,
  StyledIcon,
  StyledIconContainer,
  StyledIframe,
  Container,
} from './DisplayMap.styles';

export interface MapProps {
  height?: string;
  error?: string;
  geom?: any;
  src?: string;
  speciesId?: string | number;
  showAmateur?: boolean;
  places?: (string | undefined)[];
  fullScreen?: boolean;
}

const DisplayMap = ({
  height,
  error,
  geom,
  src = '',
  speciesId,
  showAmateur = true,
  places = [],
  fullScreen = false,
}: MapProps) => {
  const { mapToken, isFetching, invalidateMapToken } = useMapToken();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<any>(null);
  const mapSrc = useMemo(() => {
    if (src) {
      return src;
    }

    const params = new URLSearchParams();

    if (mapToken) {
      params.append('auth', mapToken);
    }

    if (showAmateur) {
      params.append('amateur', 'true');
    }

    if (speciesId !== undefined && speciesId !== null) {
      params.append('species', `${speciesId}`);
    }

    const queryString = params.toString();

    return queryString ? `${Url.SPECIES}?${queryString}` : Url.SPECIES;
  }, [mapToken, showAmateur, speciesId, src]);

  useEffect(() => {
    if (mapSrc) {
      setLoading(true);
    }
  }, [mapSrc]);

  const handleLoadMap = () => {
    setLoading(false);
    if (geom) {
      iframeRef?.current?.contentWindow?.postMessage({ geom }, '*');
    }
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

  const handleMapAuthMessage = useCallback(
    async (event) => {
      const isValidToken = event?.data?.mapIframeMsg?.auth?.valid;

      if (isValidToken === false) {
        await invalidateMapToken();
      }
    },
    [invalidateMapToken],
  );

  useEffect(() => {
    window.addEventListener('message', handleMapAuthMessage);
    return () => window.removeEventListener('message', handleMapAuthMessage);
  }, [handleMapAuthMessage]);

  if (isFetching || !mapSrc) {
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
            variant={ButtonVariants.TRANSPARENT}
            aria-label={showFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            <StyledIconContainer>
              <StyledIcon name={showFullScreen ? 'exitFullScreen' : 'fullscreen'} />
            </StyledIconContainer>
          </StyledButton>
          <StyledIframe
            allow="geolocation *"
            title="Radaviečių žemėlapis"
            ref={iframeRef}
            src={mapSrc}
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

export default DisplayMap;
