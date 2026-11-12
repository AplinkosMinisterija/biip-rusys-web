import styled from 'styled-components';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import FileDownloadContainer from '../../../components/other/FileDownloadContainer';
import Loader from '../../../components/other/Loader';
import { RequestDocumentType } from '../../../utils/constants';
import { formLabels, requestGeneratedDocuments } from '../../../utils/texts';
import { getDownloadUrl } from '../function';
import { RequestFormProps } from '../types';

export const GeneratedFileComponent = ({
  request,
  fileName,
  documentTypes,
}: {
  request?: RequestFormProps;
  fileName?: string;
  documentTypes: RequestDocumentType[];
}) => (
  <SimpleContainer title={formLabels.documents}>
    {/* A format's block swaps from "kuriamas" to a download link with no page
        load, so the region has to be live for that to reach a screen reader. */}
    <FileContainer role="status" aria-live="polite">
      {requestGeneratedDocuments
        .filter(({ type }) => documentTypes.includes(type))
        .map(({ type, field, extension, downloadSuffix, downloadLabel, generatingLabel }) => {
          const url = getDownloadUrl(request?.[field], fileName, extension, downloadSuffix);

          return url ? (
            <InnerContainer key={type}>
              <FileDownloadContainer
                url={url}
                downloadButtonTitle={downloadLabel}
                fileName={fileName}
              />
            </InnerContainer>
          ) : (
            <Container key={type}>
              <span aria-hidden="true">
                <Loader size={30} />
              </span>{' '}
              {generatingLabel}
            </Container>
          );
        })}
    </FileContainer>
  </SimpleContainer>
);

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
