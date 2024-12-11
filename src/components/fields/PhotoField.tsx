import { isEmpty } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { FileProps } from '../../types';
import { handleErrorFromServerToast } from '../../utils/functions';
import Icon from '../other/Icons';
import LoaderComponent from '../other/LoaderComponent';

export interface PhotoFieldProps {
  photo: FileProps | File | any;
  photos: FileProps[] | File[] | any[];
  onChange?: (files: File[]) => void;
  onImageClick?: () => void;
  disabled?: boolean;
  index: number | string;
  isOpen?: boolean;
  height?: number;
  getSrc: (photo: any) => string;
}

const PhotoField = ({
  photos,
  onChange,
  disabled = false,
  index,
  photo,
  height = 100,
  isOpen,
  getSrc,
  onImageClick,
}: PhotoFieldProps) => {
  const [loading, setLoading] = useState(true);

  const isMain = photo.main;

  const handleRemove = (e) => {
    e.stopPropagation();

    if (!isEmpty(photos) && onChange) {
      onChange([...photos.slice(0, index as number), ...photos.slice((index as number) + 1)]);
    }
  };

  const enablePhotoDelete = !isOpen && !disabled && !loading;

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      e.preventDefault();
      onImageClick && onImageClick();
    }
  };

  return (
    <ImageContainer
      tabIndex={0}
      aria-label={enablePhotoDelete ? 'Photo' : 'Photo, press enter to open'}
      main={isMain}
      isOpen={!!isOpen}
      onClick={onImageClick}
      key={`photo-${index}`}
      onKeyDown={handleOnKeyDown}
    >
      {enablePhotoDelete && (
        <StyledCloseIconContainer
          role="button"
          tabIndex={0}
          aria-label={'Delete photo'}
          onClick={handleRemove}
        >
          <StyledCloseIcon name="close" />
        </StyledCloseIconContainer>
      )}
      <StyledImg
        alt={photo?.name}
        isOpen={!!isOpen}
        onError={() => {
          handleErrorFromServerToast('photoNotUploaded');
          setLoading(false);
        }}
        height={height}
        $display={!loading}
        disabled={disabled}
        key={index}
        src={getSrc(photo)}
        onLoad={() => setLoading(false)}
      />
      {isMain && (
        <>
          <MainPhotoBackground />
          <MainPhotoText>Pagrindinė nuotrauka</MainPhotoText>
        </>
      )}
      {loading && (
        <ImageLayer>
          <LoaderComponent />
        </ImageLayer>
      )}
    </ImageContainer>
  );
};

const ImageLayer = styled.div`
  transition: 0.5s ease;
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCloseIcon = styled(Icon)`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.danger};
`;
const StyledCloseIconContainer = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: 1;
  display: block;
  cursor: pointer;
  z-index: 10;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const MainPhotoBackground = styled.div`
  position: absolute;
  bottom: 0;
  height: 19px;
  background-color: #000000;
  border-radius: 0px 0px 2px 2px;
  opacity: 0.49;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainPhotoText = styled.div`
  font-size: 1rem;
  color: #ffffff;
  position: absolute;
  bottom: 2px;
  left: 7px;
`;

export const StyledImg = styled.img<{
  height: number;
  disabled: boolean;
  $display: boolean;
  isOpen: boolean;
}>`
  width: fit-content;
  height: ${({ height }) => `${height}px`};
  object-fit: contain;
  border-radius: 4px;
  cursor: ${({ isOpen }) => (isOpen ? 'block' : 'pointer')};
  opacity: 1;
  $display: ${({ $display }) => ($display ? 'block' : 'none')};
  max-width: 100%;

  transition: 0.5s ease;
  backface-visibility: hidden;

  ${({ isOpen }) =>
    isOpen &&
    `@media ${device.mobileL} {
    height: 100%;
    width: 100%;
  }
  `}
`;

const ImageContainer = styled.div<{
  isOpen: boolean;
  main: boolean;
}>`
  position: relative;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  border-radius: 4px;
  border: ${({ main }) => (main ? '2px solid #FEBC1D' : 'none')};
`;

export default PhotoField;
