import { AsyncSelectField } from '@aplinkosministerija/design-system';
import { useMemo, useState } from 'react';
import { StatusModal } from '../../components/other/StatusModal';
import Api from './../../api';
import FormHistoryContainer from './../../components/containers/FormHistoryContainer';
import SimpleContainer from './../../components/containers/SimpleContainer';
import LoaderComponent from './../../components/other/LoaderComponent';
import FormPageWrapper from './../../components/wrappers/FormikFormPageWrapper';
import { ColumnOne, ColumnTwo, InnerContainer } from '../../styles/GenericStyledComponents';
import { HandleChangeType, SpeciesSearchProp } from '../../types';
import { getSpeciesList, isNew, speciesOptionLabel } from '../../utils/functions';
import { useSpeciesCriteria } from '../../utils/hooks';
import {
  buttonsTitles,
  formLabels,
  inputLabels,
  observationFormActionLabels,
  observationFormHistoryLabels,
} from '../../utils/texts';
import { getObservationFormValidationSchema } from '../../utils/validation';
import { ObservedSpecieDataContainer } from './components/ObservedSpecieDataContainer';
import { ObserverDataContainer } from './components/ObserverDataContainer';
import { ObservationMapContainer } from './components/ObservationMapContainer';
import { PhotoContainer } from './components/PhotoContainer';
import { title } from './functions';
import { useData } from './hooks/useData';
import { FormProps, ObservationFormErrors, SetObservationFormValues } from './types';

type ObservationFormContentProps = Omit<ReturnType<typeof useData>, 'loading'> & { id: string };

const ObservationForm = () => {
  const { loading, ...data } = useData();

  if (loading) {
    return <LoaderComponent />;
  }

  return <ObservationFormContent {...data} id={data.id || ''} />;
};

// Split so useState sees the loaded species: on one component, mount happens while useData loads.
const ObservationFormContent = ({
  initialValues,
  id,
  deleteInfo,
  disabled,
  handleSubmit,
  mapQueryString,
  storedSign,
  storedStage,
}: ObservationFormContentProps) => {
  const [speciesId, setSpeciesId] = useState(initialValues.species?.speciesId);
  const { criteria, failed: criteriaFailed } = useSpeciesCriteria(speciesId);
  const predatesSigns = !isNew(id) && initialValues.activity == null;
  const validationSchema = useMemo(
    () => getObservationFormValidationSchema({ criteria, predatesSigns, criteriaFailed }),
    [criteria, predatesSigns, criteriaFailed],
  );

  const renderForm = (
    values: FormProps,
    errors: ObservationFormErrors,
    handleChange: HandleChangeType,
    setValues?: SetObservationFormValues,
  ) => {
    const setObservationValues = setValues ?? (() => undefined);

    const handleUpdateSpecie = (species: SpeciesSearchProp) => {
      setSpeciesId(species?.speciesId);
      setObservationValues({
        ...values,
        species,
        evolution: null,
        method: '',
        methodValue: '',
        activity: null,
      });
    };

    return (
      <InnerContainer>
        <ColumnOne>
          <SimpleContainer title={formLabels.informationAboutObservedSpecie}>
            <AsyncSelectField
              label={inputLabels.specie}
              disabled={!isNew(id) && disabled}
              value={values.species}
              error={errors.species}
              name="species"
              onChange={(species: SpeciesSearchProp) => {
                handleUpdateSpecie(species);
              }}
              getOptionLabel={(option) => speciesOptionLabel(option)}
              getOptionId={(option) => option?.speciesId}
              loadOptions={(input, page) => getSpeciesList(input, page)}
              ariaLabelRemove="Pašalinti"
              texts={{
                resultsCount: (count) => `${count} Rūšys`,
                noOptions: 'Nėra rūšių pasirinkimų',
              }}
            />
          </SimpleContainer>
          <ObservedSpecieDataContainer
            values={values}
            errors={errors}
            handleChange={handleChange}
            disabled={disabled}
            setValues={setObservationValues}
            criteria={criteria}
            storedSign={storedSign}
            storedStage={storedStage}
          />
          <ObservationMapContainer
            values={values}
            errors={errors}
            disabled={disabled}
            mapQueryString={mapQueryString}
            handleChange={handleChange}
          />
          <PhotoContainer
            photos={values.photos}
            photoError={errors.photos}
            handleChange={handleChange}
            disabled={disabled}
          />
          <ObserverDataContainer
            values={values}
            errors={errors}
            handleChange={handleChange}
            disabled={disabled}
            id={id}
          />
        </ColumnOne>
        {!isNew(id) && (
          <ColumnTwo>
            <FormHistoryContainer
              name="formHistory"
              formHistoryLabels={observationFormHistoryLabels}
              endpoint={Api.getObservationFormHistory}
            />
          </ColumnTwo>
        )}
        <StatusModal
          handleChange={handleChange}
          values={{
            status: values?.status,
            comment: values?.comment,
          }}
          labels={observationFormActionLabels}
        />
      </InnerContainer>
    );
  };

  return (
    <FormPageWrapper
      twoColumn={!isNew(id)}
      title={title(disabled, id)}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validationSchema}
      disabled={disabled}
      submitButtonText={buttonsTitles.submit}
      deleteInfo={deleteInfo}
    />
  );
};

export default ObservationForm;
