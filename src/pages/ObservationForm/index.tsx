import AsyncSelectField from '../../components/fields/AsyncSelectField';
import DrawMap from '../../components/map/DrawMap';
import { StatusModal } from '../../components/other/StatusModal';
import Api from './../../api';
import FormHistoryContainer from './../../components/containers/FormHistoryContainer';
import SimpleContainer from './../../components/containers/SimpleContainer';
import LoaderComponent from './../../components/other/LoaderComponent';
import FormPageWrapper from './../../components/wrappers/FormikFormPageWrapper';
import { ColumnOne, ColumnTwo, InnerContainer } from './../../styles/GenericStyledComponents';
import { Species } from './../../types';
import { getSpeciesList, isNew, speciesOptionLabel } from './../../utils/functions';
import {
  buttonsTitles,
  formLabels,
  inputLabels,
  observationFormActionLabels,
  observationFormHistoryLabels,
} from './../../utils/texts';
import { validateForm } from './../../utils/validation';
import { ObservedSpecieDataContainer } from './components/ObservedSpecieDataContainer';
import { ObserverDataContainer } from './components/ObserverDataContainer';
import { PhotoContainer } from './components/PhotoContainer';
import { title } from './functions';
import { useData } from './hooks/useData';
import { FormProps } from './types';

const ObservationForm = () => {
  const {
    initialValues,
    id = '',
    deleteInfo,
    disabled,
    loading,
    handleSubmit,
    mapQueryString,
  } = useData();

  const renderForm = (values: FormProps, errors: any, handleChange: any, setValues: any) => {
    const handleUpdateSpecie = (species: Species) => {
      setValues({
        ...values,
        species,
        evolution: '',
        method: '',
        methodValue: '',
        activity: '',
      });
    };

    return (
      <InnerContainer>
        <ColumnOne>
          <SimpleContainer title={formLabels.informationAboutObservedSpecie}>
            <AsyncSelectField
              label={inputLabels.specie}
              disabled={!isNew(id)}
              value={values.species}
              error={errors.species as any}
              name="species"
              onChange={(species: Species) => {
                handleUpdateSpecie(species);
              }}
              getOptionLabel={(option) => speciesOptionLabel(option)}
              loadOptions={(input, page) => getSpeciesList(input, page)}
            />
          </SimpleContainer>
          <ObservedSpecieDataContainer
            values={values}
            errors={errors}
            handleChange={handleChange}
            disabled={disabled}
            setValues={setValues}
          />
          <SimpleContainer title={formLabels.map}>
            <DrawMap
              value={values?.geom}
              queryString={mapQueryString}
              error={errors?.geom}
              onSave={(data) => handleChange('geom', data)}
              height={'300px'}
            />
          </SimpleContainer>
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

  if (loading) {
    return <LoaderComponent />;
  }
  return (
    <FormPageWrapper
      twoColumn={!isNew(id)}
      title={title(disabled, id)}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validateForm}
      disabled={disabled}
      submitButtonText={buttonsTitles.submit}
      deleteInfo={deleteInfo}
    />
  );
};

export default ObservationForm;
