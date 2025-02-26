import { CheckBox, FieldWrapper, TextField } from '@aplinkosministerija/design-system';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import Api from '../../api';
import FormHistoryContainer from '../../components/containers/FormHistoryContainer';
import SimpleContainer from '../../components/containers/SimpleContainer';
import LoaderComponent from '../../components/other/LoaderComponent';
import { StatusModal } from '../../components/other/StatusModal';
import FormPageWrapper from '../../components/wrappers/FormikFormPageWrapper';
import { ColumnOne, ColumnTwo, InnerContainer } from '../../styles/GenericStyledComponents';
import { RequestTypes } from '../../utils/constants';
import { getRequestDocumentTypes, isNew } from '../../utils/functions';
import {
  buttonsTitles,
  documentTypeLabels,
  formLabels,
  inputLabels,
  requestFormActionLabels,
  requestFormHistoryLabels,
} from '../../utils/texts';
import { validateRequestForm } from '../../utils/validation';
import { AdditionalInfoComponent } from './components/AdditionalInfoContainer';
import { FormTypeContainer } from './components/FormTypeContainer';
import { GeneratedFileComponent } from './components/GeneratedFileContainer';
import SpeciesTaxonomiesContainer from './components/TaxonomiesContainer';
import { getFileName } from './function';
import { useData } from './hooks/useData';
import { useGeoJson } from './hooks/useGeojson';
import { RequestFormProps } from './types';

const RequestForm = () => {
  const {
    disabled,
    initialFormValues,
    id,
    loading,
    title,
    deleteInfo,
    showFileComponent,
    handleSubmit,
  } = useData();
  const { requestGeoJson, isLoadingGeoJson } = useGeoJson(id);
  const fileName = getFileName(id);

  const renderForm = (values: RequestFormProps, errors: any, handleChange: any) => {
    const requestDocumentTypes = getRequestDocumentTypes();
    const isGetOnce = isEqual(values?.type, RequestTypes.GET_ONCE);

    const onChangeDocumentType = (documentType) => {
      const documentTypes = values.documentTypes || [];
      handleChange(
        'documentTypes',
        documentTypes.includes(documentType)
          ? values.documentTypes.filter((type) => type !== documentType)
          : [...values.documentTypes, documentType],
      );
    };

    return (
      <InnerContainer>
        <ColumnOne>
          <FormTypeContainer handleChange={handleChange} type={values.type} disabled={!isNew(id)} />
          <SimpleContainer title={formLabels.contactInfo}>
            <TextField
              disabled={disabled}
              label={inputLabels.email}
              value={values.notifyEmail}
              name={'notifyEmail'}
              type="email"
              error={errors?.notifyEmail}
              onChange={(email) => handleChange('notifyEmail', email)}
              bottomLabel={inputLabels.repliesWIllBeSentToThisEmail}
            />
          </SimpleContainer>
          {isGetOnce && (
            <SimpleContainer title={formLabels.selectExcerptFormat}>
              <FieldWrapper error={errors.documentTypes}>
                <CheckboxColumn>
                  {requestDocumentTypes.map((item) => (
                    <div key={`document-type-${item}`}>
                      <CheckBox
                        error={errors.documentTypes}
                        disabled={disabled}
                        value={values?.documentTypes?.includes(item)}
                        label={documentTypeLabels[item]}
                        onChange={() => onChangeDocumentType(item)}
                      />
                    </div>
                  ))}
                </CheckboxColumn>
              </FieldWrapper>
            </SimpleContainer>
          )}
          <SpeciesTaxonomiesContainer
            disabled={disabled}
            onChange={handleChange}
            values={values || []}
            errors={errors}
          />
          <AdditionalInfoComponent
            values={values}
            errors={errors}
            handleChange={handleChange}
            disabled={disabled}
          />
        </ColumnOne>
        {!isNew(id) && (
          <ColumnTwo>
            {showFileComponent && (
              <GeneratedFileComponent
                onDownloadGeoJson={requestGeoJson}
                loadingGeoJson={isLoadingGeoJson}
                generatedFile={values.generatedFile}
                documentTypes={values.documentTypes}
                fileName={`${formLabels.documentNo}${fileName}`}
              />
            )}
            <FormHistoryContainer
              name="requestHistory"
              formHistoryLabels={requestFormHistoryLabels}
              endpoint={Api.getRequestHistory}
            />
          </ColumnTwo>
        )}
        <StatusModal
          handleChange={handleChange}
          values={{
            status: values?.status,
            comment: values?.comment,
          }}
          labels={requestFormActionLabels}
        />
      </InnerContainer>
    );
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <FormPageWrapper
      twoColumn={!isNew(id)}
      title={title}
      initialValues={initialFormValues}
      deleteInfo={deleteInfo}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validateRequestForm}
      disabled={disabled}
      submitButtonText={buttonsTitles.submit}
    />
  );
};

const CheckboxColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default RequestForm;
