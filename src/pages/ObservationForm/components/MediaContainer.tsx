import { isEmpty } from 'lodash';
import Api from '../../../api';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import MediaUploadField from '../../../components/fields/MediaUploadField';
import { FieldHint } from '../../../components/other/FieldHint';
import { MediaFileProps } from '../../../types';
import { fieldHints, formLabels } from '../../../utils/texts';

interface MediaContainerProps {
  media: MediaFileProps[];
  disabled: boolean;
  handleChange: (name: 'media', value: MediaFileProps[]) => void;
}

export const MediaContainer = ({ media, disabled, handleChange }: MediaContainerProps) => {
  if (disabled && isEmpty(media)) return <></>;

  return (
    <SimpleContainer title={formLabels.media}>
      <FieldHint hint={fieldHints.media} show={!disabled}>
        <MediaUploadField
          media={media}
          disabled={disabled}
          onUpload={(file) => Api.uploadMedia(file)}
          onChange={(value) => handleChange('media', value)}
        />
      </FieldHint>
    </SimpleContainer>
  );
};
