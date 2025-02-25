import styled from 'styled-components';
import { buttonsTitles } from '../../utils/texts';
import Icon from './Icons';

export interface FileDownloadProps {
  url?: string;
  fileName?: string;
  onDownload?: () => void;
  downloadButtonTitle?: string;
}

const FilesToDownload = ({ onDownload, url, fileName, downloadButtonTitle }: FileDownloadProps) => {
  if (!onDownload && !url) return <></>;

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {onDownload ? (
        <DownloadButton onClick={onDownload}>
          {fileName && <FileName>{fileName}</FileName>}
          <InnerContainer>
            {downloadButtonTitle || buttonsTitles.downLoad}
            <StyledIcon name={'download'} />
          </InnerContainer>
        </DownloadButton>
      ) : (
        <DownloadContainer target={'_blank'} href={url} download>
          {fileName && <FileName>{fileName}</FileName>}
          <InnerContainer>
            {downloadButtonTitle || buttonsTitles.downLoad}
            <StyledIcon name={'download'} />
          </InnerContainer>
        </DownloadContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  font-size: 1.6rem;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const FileName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DownloadButton = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  color: inherit;
  text-decoration: none;
  &:hover {
    opacity: 50%;
  }
`;

const DownloadContainer = styled.a`
  display: flex;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  color: inherit;
  text-decoration: none;
  &:hover {
    opacity: 50%;
  }
`;

const StyledIcon = styled(Icon)`
  margin: 0 5px 0 5px;
  font-weight: 900;
`;

export default FilesToDownload;
