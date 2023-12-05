import { isEmpty, map } from 'lodash';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { FileProps } from '../../types';
import { bytesToMb, handleErrorToast } from '../../utils/functions';
import { inputLabels, validationTexts } from '../../utils/texts';
import { validateFileSizes, validateFileTypes } from '../../utils/validation';
import Icon from '../other/Icons';
import LoaderComponent from '../other/LoaderComponent';
import FieldWrapper from './components/FieldWrapper';

export interface FileFieldProps {
  onChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  files: FileProps[] | File[] | any[];
  label: string;
  disabled: boolean;
  error?: string;
}

export const availableMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];

const availableExtensionsTypes = ['.png', '.jpg', '.jpeg', '.pdf'];

const DragAndDropUploadField = ({
  onChange,
  onUpload,
  files,
  label,
  disabled,
  error,
}: FileFieldProps) => {
  const inputRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSetFiles = async (currentFiles: File[]) => {
    const isValidFileTypes = validateFileTypes(currentFiles);
    if (!isValidFileTypes) return handleErrorToast(validationTexts.badFileTypes);
    const isValidFileSizes = validateFileSizes(currentFiles);
    if (!isValidFileSizes) return handleErrorToast(validationTexts.fileSizesExceeded);

    if (onUpload) {
      setLoading(true);
      await onUpload(currentFiles);
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files: File[] = Array.from(e.dataTransfer.files);
      handleSetFiles(files);
    }
  };

  const handleChange = (e: any) => {
    if (disabled) return;
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const files: File[] = Array.from(e.target.files);
      handleSetFiles(files);
    }
  };

  const onButtonClick = () => {
    if (disabled) return;

    inputRef?.current?.click();
  };

  return (
    <>
      {!disabled && (
        <FieldWrapper label={label} error={error}>
          <UploadFileContainer
            error={!!error}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <Input
              aria-label={'files'}
              ref={inputRef}
              type="file"
              accept={availableExtensionsTypes.join(', ')}
              multiple={true}
              onChange={handleChange}
            />
            <TextRow>
              <BoldText>{inputLabels.pressToWant}</BoldText>
              <Text>{inputLabels.uploadOrDragFilesHere}</Text>
            </TextRow>
            <Text>{inputLabels.fileTypesAndMaxSize}</Text>
          </UploadFileContainer>
        </FieldWrapper>
      )}
      {loading && <LoaderComponent />}
      {map(files, (file, index) => {
        if (!files) return null;

        return (
          <FileContainer key={`${index}-file`}>
            <FileInnerContainer>
              <FileName>{file?.name}</FileName>
              <FileSize>{bytesToMb(file.size)}</FileSize>
            </FileInnerContainer>
            <IconContainer href={file.url} title={file?.name} target="_blank" download={file?.name}>
              <StyledIcon name="download" />
            </IconContainer>
            {!disabled && (
              <IconContainer
                onClick={(e) => {
                  e.stopPropagation();

                  if (!isEmpty(files) && onChange) {
                    onChange([...files.slice(0, index), ...files.slice(index + 1)]);
                  }
                }}
              >
                <StyledIcon name="remove" />
              </IconContainer>
            )}
          </FileContainer>
        );
      })}
    </>
  );
};

const IconContainer = styled.a`
  margin-top: auto;
  height: 40px;
  display: flex;
  @media ${device.mobileL} {
    margin-bottom: 0px;
    height: auto;
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 1.8rem;
  color: #9aa4b2;
  margin: auto 0 auto 16px;
  @media ${device.mobileL} {
    margin: 8px 0 16px 0;
  }
`;

const Text = styled.div`
  font-size: 1.1rem;
  color: #697586;
  text-align: center;
`;

const FileName = styled.div`
  font-size: 1.4rem;
  color: #121926;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 500px;
`;

const FileInnerContainer = styled.div`
  width: 90%;
`;

const FileSize = styled.div`
  font-size: 1.2rem;
  color: #4b5565;
`;
const BoldText = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #121926;
  margin-right: 4px;
`;

const Input = styled.input`
  display: none;
`;

const FileContainer = styled.div<{ opacity?: number }>`
  margin-top: 4px;
  opacity: ${({ opacity }) => opacity || 1};
  position: relative;
  background-color: white;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  padding: 3px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const UploadFileContainer = styled.div<{ error: boolean }>`
  cursor: pointer;
  background-color: #eeebe53d;
  border: 2px dashed ${({ theme, error }) => (error ? theme.colors.error : theme.colors.border)};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 77px;
`;

export default DragAndDropUploadField;
