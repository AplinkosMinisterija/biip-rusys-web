import { useRef, useState } from 'react';
import Cookies from 'universal-cookie';

import LoaderComponent from '../../../components/other/LoaderComponent';
import { ButtonVariants } from '../../../styles';
import { Url } from '../../../utils/constants';
import {
  Container,
  InnerContainer,
  StyledButton,
  StyledIcon,
  StyledIconContainer,
  StyledIframe,
} from './CloseSpeciesMap.styles';

export interface MapProps {
  geom: any;
  speciesId?: any;
}

const cookies = new Cookies();

const CloseSpeciesMap = ({ geom, speciesId }: MapProps) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<any>(null);
  const mapToken = cookies.get('mapToken');

  const getMapQueryString = () => {
    if (!mapToken) return '';

    const queryString = `?`;
    const param = new URLSearchParams();

    param.append('auth', mapToken);
    param.append('species', speciesId!);
    return queryString + param;
  };
  const queryString = getMapQueryString();

  const src = `${Url.SPECIES}${queryString}`;

  const handleLoadMap = () => {
    setLoading(false);
    iframeRef?.current?.contentWindow?.postMessage({ geom }, '*');
  };

  return (
    <>
      {loading ? <LoaderComponent /> : null}
      <Container showModal={showModal} error={false}>
        <InnerContainer showModal={showModal}>
          <StyledButton
            popup={showModal}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(!showModal);
            }}
            variant={ButtonVariants.TRANSPARENT}
            aria-label={showModal ? 'Išeiti iš pilno ekrano' : 'Atidaryti pilname ekrane'}
          >
            <StyledIconContainer>
              <StyledIcon name={showModal ? 'exitFullScreen' : 'fullscreen'} />
            </StyledIconContainer>
          </StyledButton>
          <StyledIframe
            allow="geolocation *"
            ref={iframeRef}
            src={src}
            width={'100%'}
            height={showModal ? '100%' : `300px`}
            allowFullScreen={true}
            onLoad={handleLoadMap}
            aria-hidden="false"
            tabIndex={1}
          />
        </InnerContainer>
      </Container>
    </>
  );
};

export default CloseSpeciesMap;
