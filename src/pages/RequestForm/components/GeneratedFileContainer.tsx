import styled from 'styled-components';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import FileDownloadContainer from '../../../components/other/FileDownloadContainer';
import Loader from '../../../components/other/Loader';
import { formLabels, inputLabels } from '../../../utils/texts';

export const GeneratedFileComponent = ({ generatedFile }: { generatedFile?: string }) => {
  return (
    <SimpleContainer title={formLabels.documents}>
      <FileContainer>
        {generatedFile ? (
          <FileDownloadContainer url={generatedFile} showFileName={true} />
        ) : (
          <InnerContainer>
            <Loader /> {inputLabels.generating}
          </InnerContainer>
        )}
      </FileContainer>
    </SimpleContainer>
  );
};

const FileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
