import { isEmpty } from 'lodash';
import { Resources } from '../../../utils/constants';
import { PhotoContainerProps } from '../types';
import Api from './../../../api';
import SimpleContainer from './../../../components/containers/SimpleContainer';
import PhotoUploadField from './../../../components/fields/PhotoUploadField';
import { formLabels } from './../../../utils/texts';

export const PhotoContainer = ({
  photos,
  photoError,
  handleChange,
  disabled,
}: PhotoContainerProps) => {
  const handleUpload = async (newPhotos) => {
    const uploadedPhotos = await Api.uploadFiles(Resources.FORMS, newPhotos);

    handleChange('photos', [...photos, ...uploadedPhotos]);
  };
  const showPhotosContainer = !disabled || !isEmpty(photos);

  if (!showPhotosContainer) return <></>;

  return (
    <SimpleContainer title={formLabels.photos}>
      <PhotoUploadField
        getSrc={(photo) => photo.url}
        canOpenPhoto={disabled}
        disabled={disabled}
        onUpload={async (photos: File[]) => handleUpload(photos)}
        onChange={async (photos: any) => handleChange('photos', photos)}
        name={'photos'}
        photos={photos}
        error={photoError}
      />
    </SimpleContainer>
  );
};
