import styled from 'styled-components';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import FileDownloadContainer from '../../../components/other/FileDownloadContainer';
import Loader from '../../../components/other/Loader';
import { RequestDocumentType } from '../../../utils/constants';
import { buttonsTitles, formLabels, inputLabels } from '../../../utils/texts';

export const GeneratedFileComponent = ({
  generatedFile,
  onDownloadGeoJson,
  loadingGeoJson,
  fileName,
  documentTypes,
}: {
  generatedFile?: string;
  fileName?: string;
  onDownloadGeoJson?: () => void;
  loadingGeoJson?: boolean;
  documentTypes: RequestDocumentType[];
}) => {
  const renderLoader = () => (
    <Container>
      <Loader size={30} /> {inputLabels.generating}
    </Container>
  );

  const renderFileDownload = (
    url?: string,
    onDownload?: () => void,
    loading?: boolean,
    title?: string,
  ) => {
    if (loading) return renderLoader();

    return (
      <InnerContainer>
        <FileDownloadContainer
          url={url}
          onDownload={onDownload}
          downloadButtonTitle={title}
          fileName={fileName}
        />
      </InnerContainer>
    );
  };

  return (
    <SimpleContainer title={formLabels.documents}>
      <FileContainer>
        {documentTypes.includes(RequestDocumentType.PDF) &&
          renderFileDownload(generatedFile, undefined, !generatedFile)}
        {documentTypes.includes(RequestDocumentType.GEOJSON) &&
          onDownloadGeoJson &&
          renderFileDownload(
            undefined,
            onDownloadGeoJson,
            loadingGeoJson,
            buttonsTitles.downLoadGeoJson,
          )}
      </FileContainer>
    </SimpleContainer>
  );
};

const FileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  cursor: pointer;
  gap: 12px;
  padding: 10px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors?.amberYellow};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 7.5px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
`;
