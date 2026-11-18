import { useRef, useState } from 'react';
import styled from 'styled-components';
import { MediaFileProps } from '../../types';
import { mediaTexts } from '../../utils/texts';

export const MEDIA_ACCEPT = '.mp3,.wav,.m4a,.mp4,.mov,.webm,audio/*,video/*';
const MEDIA_EXTENSIONS = ['mp3', 'wav', 'm4a', 'mp4', 'mov', 'webm'];
export const MEDIA_MAX_SIZE = 100 * 1024 * 1024;

const extension = (name = '') => name.split('.').pop()?.toLowerCase() || '';

const isVideo = (file: MediaFileProps) =>
  file.mimetype
    ? file.mimetype.startsWith('video')
    : ['mp4', 'mov', 'webm'].includes(extension(file.url));

const formatSize = (size?: number) => (size ? `${(size / 1024 / 1024).toFixed(1)} MB` : '');

interface MediaUploadFieldProps {
  media: MediaFileProps[];
  disabled?: boolean;
  onChange: (media: MediaFileProps[]) => void;
  onUpload: (file: File) => Promise<MediaFileProps>;
}

const MediaUploadField = ({ media, disabled, onChange, onUpload }: MediaUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setError('');

    const selected = Array.from(files);
    const invalidType = selected.find((file) => !MEDIA_EXTENSIONS.includes(extension(file.name)));
    if (invalidType) return setError(mediaTexts.badType);
    if (selected.some((file) => file.size > MEDIA_MAX_SIZE)) return setError(mediaTexts.tooLarge);

    setLoading(true);
    try {
      const uploaded: MediaFileProps[] = [];
      for (const file of selected) {
        uploaded.push(await onUpload(file));
      }
      onChange([...media, ...uploaded]);
    } catch (err: any) {
      const type = err?.response?.data?.type;
      setError(
        type === 'FILE_TOO_LARGE'
          ? mediaTexts.tooLarge
          : type === 'UNSUPPORTED_MIMETYPE'
            ? mediaTexts.badType
            : mediaTexts.failed,
      );
    }
    setLoading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <Container>
      {media.map((file, index) => (
        <Item key={`${file.url}-${index}`}>
          {isVideo(file) ? (
            <Video src={file.url} controls preload="metadata" />
          ) : (
            <Audio src={file.url} controls preload="metadata" />
          )}
          <Row>
            <Name href={file.url} target="_blank" rel="noreferrer">
              {file.name} {formatSize(file.size) && `(${formatSize(file.size)})`}
            </Name>
            {!disabled && (
              <RemoveButton
                type="button"
                onClick={() => onChange(media.filter((_, i) => i !== index))}
              >
                {mediaTexts.remove}
              </RemoveButton>
            )}
          </Row>
        </Item>
      ))}
      {!disabled && (
        <>
          <UploadButton type="button" disabled={loading} onClick={() => inputRef.current?.click()}>
            {loading ? mediaTexts.uploading : mediaTexts.upload}
          </UploadButton>
          <input
            ref={inputRef}
            type="file"
            accept={MEDIA_ACCEPT}
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </>
      )}
      {error && <Error role="alert">{error}</Error>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
`;

const Video = styled.video`
  width: 100%;
  max-height: 360px;
  background-color: #000;
  border-radius: 4px;
`;

const Audio = styled.audio`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Name = styled.a`
  font-size: 1.4rem;
  color: #121926;
  word-break: break-all;
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  cursor: pointer;
`;

const UploadButton = styled.button`
  align-self: flex-start;
  padding: 8px 16px;
  border: 1px dashed #9aa4b2;
  border-radius: 4px;
  background-color: white;
  font-size: 1.4rem;
  cursor: pointer;
  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;

const Error = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.error};
`;

export default MediaUploadField;
