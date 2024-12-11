import { CheckBox, DragAndDropUploadField, TextAreaField } from '@aplinkosministerija/design-system';
import Api from '../../../api';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import { Resources, SpeciesTypes } from '../../../utils/constants';
import {
  formLabels,
  inputLabels,
  typeDescriptionLabels,
  typeFileLabels,
} from '../../../utils/texts';
import { Column } from '../styles';
import { AdditionalInfoComponentProps } from '../types';
import { AdditionalFieldsByFormType } from './AdditionalFieldsByFormType';

export const AdditionalInfoComponent = ({
  handleChange,
  disabled,
  values,
  errors,
}: AdditionalInfoComponentProps) => {
  const handleUploadFile = async (files) => {
    const uploadedFiles = await Api.uploadFiles(Resources.REQUESTS, files);
    handleChange('files', [...values.files, ...uploadedFiles]);
  };

  const isEndangeredForm = values?.speciesTypes?.includes(SpeciesTypes.ENDANGERED);
  const type = values?.type ? values?.type : '';

  return (
    <SimpleContainer title={formLabels.additionalInfo}>
      <Column>
        <AdditionalFieldsByFormType
          values={values}
          errors={errors}
          disabled={disabled}
          handleChange={handleChange}
        />
        {isEndangeredForm && (
          <DragAndDropUploadField
            disabled={disabled}
            error={errors?.files}
            onUpload={handleUploadFile}
            onDelete={(files: File[]) => handleChange('files', files)}
            files={values?.files || []}
            label={typeFileLabels[type]}
          />
        )}
        <TextAreaField
          disabled={disabled}
          padding="24px 0 18px 0"
          label={typeDescriptionLabels[type]}
          value={values.description}
          error={errors?.description}
          name={'description'}
          onChange={(email) => handleChange('description', email)}
        />
        <CheckBox
          disabled={disabled}
          label={inputLabels.correctInformation}
          value={values.isCorrectFormInformation}
          error={!!errors?.isCorrectFormInformation}
          onChange={(value) => handleChange('isCorrectFormInformation', value)}
        />
        {isEndangeredForm && (
          <CheckBox
            disabled={disabled}
            label={inputLabels.commitToProtectData}
            value={values.commitToProtectData}
            error={!!errors?.commitToProtectData}
            onChange={(value) => handleChange(`commitToProtectData`, value)}
          />
        )}
      </Column>
    </SimpleContainer>
  );
};
