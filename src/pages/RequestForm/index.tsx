import Api from '../../api';
import FormHistoryContainer from '../../components/containers/FormHistoryContainer';
import SimpleContainer from '../../components/containers/SimpleContainer';
import LoaderComponent from '../../components/other/LoaderComponent';
import { StatusModal } from '../../components/other/StatusModal';
import FormPageWrapper from '../../components/wrappers/FormikFormPageWrapper';
import { ColumnOne, ColumnTwo, InnerContainer } from '../../styles/GenericStyledComponents';
import { isNew } from '../../utils/functions';
import {
  buttonsTitles,
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
import { useData } from './hooks/useData';
import { RequestFormProps } from './types';
import { TextField } from '@aplinkosministerija/design-system';

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

  const renderForm = (values: RequestFormProps, errors: any, handleChange: any) => {
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
            {showFileComponent && <GeneratedFileComponent generatedFile={values.generatedFile} />}
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

export default RequestForm;
