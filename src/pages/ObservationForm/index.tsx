import { Form, Formik, yupToFormErrors } from 'formik';
import { useState } from 'react';
import styled from 'styled-components';
import Button, { ButtonColors } from '../../components/buttons/Button';
import DrawMap from '../../components/map/DrawMap';
import { FormErrorMessage } from '../../components/other/FormErrorMessage';
import { FormTitle } from '../../components/other/FormTitle';
import { StatusModal } from '../../components/other/StatusModal';
import FormPageWrapper from '../../components/wrappers/FormPageWrapper';
import { StatusTypes } from '../../utils/constants';
import { validateDraftForm, validateForm } from '../../utils/validation';
import Api from './../../api';
import FormHistoryContainer from './../../components/containers/FormHistoryContainer';
import SimpleContainer from './../../components/containers/SimpleContainer';
import AsyncSelectField from './../../components/fields/AsyncSelectField';
import LoaderComponent from './../../components/other/LoaderComponent';
import { ColumnOne, ColumnTwo, InnerContainer } from './../../styles/GenericStyledComponents';
import { SpeciesSearchProp } from './../../types';
import { getSpeciesList, isNew, speciesOptionLabel } from './../../utils/functions';
import {
  buttonsTitles,
  formLabels,
  inputLabels,
  observationFormActionLabels,
  observationFormHistoryLabels,
} from './../../utils/texts';
import { ObservedSpecieDataContainer } from './components/ObservedSpecieDataContainer';
import { ObserverDataContainer } from './components/ObserverDataContainer';
import { PhotoContainer } from './components/PhotoContainer';
import { title } from './functions';
import { useData } from './hooks/useData';

const ObservationForm = () => {
  const {
    initialValues,
    id = '',
    disabled,
    loading,
    handleSubmitForm,
    handleDraftSubmit,
    isDraft,
    mapQueryString,
  } = useData();
  const [validateOnChange, setValidateOnChange] = useState(false);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <FormPageWrapper>
      <Formik
        enableReinitialize={false}
        initialValues={initialValues}
        onSubmit={(values, helper) => {
          values.status === StatusTypes.DRAFT
            ? handleDraftSubmit(values)
            : handleSubmitForm(values, helper);
        }}
        validateOnChange={validateOnChange}
        validate={async (values) => {
          setValidateOnChange(true);

          try {
            values.status === StatusTypes.DRAFT
              ? await validateDraftForm.validate(values, { abortEarly: false })
              : await validateForm.validate(values, { abortEarly: false });
          } catch (e) {
            return {
              ...yupToFormErrors(e),
            };
          }

          return null;
        }}
      >
        {({ values, errors, setFieldValue, handleSubmit, setValues }) => {
          const handleUpdateSpecie = (species: SpeciesSearchProp) => {
            setValues({
              ...values,
              species,
              evolution: undefined,
              method: '',
              methodValue: '',
              activity: undefined,
            });
          };

          return (
            <StyledForm two_column={!isDraft ? 1 : 0}>
              <FormTitle title={title(disabled, id)} />

              <InnerContainer>
                <ColumnOne>
                  <SimpleContainer title={formLabels.informationAboutObservedSpecie}>
                    <AsyncSelectField
                      label={inputLabels.specie}
                      disabled={!isNew(id)}
                      value={values.species}
                      error={errors.species as any}
                      name="species"
                      onChange={(species: SpeciesSearchProp) => {
                        handleUpdateSpecie(species);
                      }}
                      getOptionLabel={(option) => speciesOptionLabel(option)}
                      loadOptions={(input, page) => getSpeciesList(input, page)}
                    />
                  </SimpleContainer>
                  <ObservedSpecieDataContainer
                    values={values}
                    errors={errors}
                    handleChange={setFieldValue}
                    disabled={disabled}
                    setValues={setValues}
                  />
                  <SimpleContainer title={formLabels.map}>
                    <DrawMap
                      value={values?.geom}
                      queryString={mapQueryString}
                      error={errors?.geom}
                      onSave={(data) => setFieldValue('geom', data)}
                      height={'300px'}
                    />
                  </SimpleContainer>
                  <PhotoContainer
                    photos={values.photos}
                    photoError={errors.photos}
                    handleChange={setFieldValue}
                    disabled={disabled}
                  />
                  <ObserverDataContainer
                    values={values}
                    errors={errors}
                    handleChange={setFieldValue}
                    disabled={disabled}
                    isDraft={isDraft}
                  />
                </ColumnOne>
                {!isDraft && (
                  <ColumnTwo>
                    <FormHistoryContainer
                      name="formHistory"
                      formHistoryLabels={observationFormHistoryLabels}
                      endpoint={Api.getObservationFormHistory}
                    />
                  </ColumnTwo>
                )}
                <StatusModal
                  handleChange={setFieldValue}
                  values={{
                    status: values?.status,
                    comment: values?.comment,
                  }}
                  labels={observationFormActionLabels}
                />
              </InnerContainer>
              <FormErrorMessage errors={errors} />

              {!disabled && (
                <ButtonContainer>
                  <Button
                    aria-label={buttonsTitles.save}
                    onClick={async () => {
                      if (isNew(id)) {
                        setFieldValue('status', '');
                        await Promise.resolve();
                      }

                      handleSubmit();
                    }}
                    type="button"
                    color="black"
                    height={32}
                    disabled={disabled}
                  >
                    {buttonsTitles.save}
                  </Button>
                  {isDraft && (
                    <Button
                      aria-label={buttonsTitles.saveDraft}
                      onClick={async () => {
                        setFieldValue('status', StatusTypes.DRAFT);
                        await Promise.resolve();
                        handleSubmit();
                      }}
                      variant={ButtonColors.TRANSPARENT}
                      type="button"
                      color="black"
                      height={32}
                      disabled={disabled}
                    >
                      {buttonsTitles.saveDraft}
                    </Button>
                  )}
                </ButtonContainer>
              )}
            </StyledForm>
          );
        }}
      </Formik>
    </FormPageWrapper>
  );
};

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledForm = styled(Form)<{ two_column: number }>`
  display: flex;
  flex-direction: column;
  flex-basis: ${({ two_column }) => (two_column ? '1200px' : '800px')};
`;

export default ObservationForm;
