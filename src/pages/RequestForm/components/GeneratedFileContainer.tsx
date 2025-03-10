import styled from 'styled-components';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import FileDownloadContainer from '../../../components/other/FileDownloadContainer';
import Loader from '../../../components/other/Loader';
import { RequestDocumentType } from '../../../utils/constants';
import { buttonsTitles, formLabels, inputLabels } from '../../../utils/texts';

export const GeneratedFileComponent = ({
  generatedFilePdf,
  generatedFileGeojson,
  fileName,
  documentTypes,
}: {
  generatedFilePdf?: string;
  generatedFileGeojson?: string;
  fileName?: string;
  documentTypes: RequestDocumentType[];
}) => {
  const renderLoader = ({ loadingLabel }) => (
    <Container>
      <Loader size={30} /> {loadingLabel}
    </Container>
  );

  const renderFileDownload = (
    url?: string,
    onDownload?: () => void,
    loading?: boolean,
    title?: string,
    loadingLabel?: string,
  ) => {
    if (loading) return renderLoader({ loadingLabel });

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
          renderFileDownload(
            generatedFilePdf,
            undefined,
            !generatedFilePdf,
            '',
            inputLabels.pdfGenerating,
          )}
        {documentTypes.includes(RequestDocumentType.GEOJSON) &&
          renderFileDownload(
            generatedFileGeojson,
            undefined,
            !generatedFileGeojson,
            buttonsTitles.downLoadGeoJson,
            inputLabels.geojsonGenerating,
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
