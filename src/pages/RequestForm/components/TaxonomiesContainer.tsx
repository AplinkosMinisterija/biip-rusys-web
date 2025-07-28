import { MapField } from '@aplinkosministerija/design-system';
import { isEmpty, isEqual } from 'lodash';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import Tree from '../../../components/fields/TreeSelect';
import { mapsHost, RequestTypes } from '../../../utils/constants';
import { inputLabels } from '../../../utils/texts';
import { getMapPath } from '../function';
import { useSpeciesTree } from '../hooks/useSpeciesTree';
import { Container } from '../styles';
import { SpeciesTaxonomiesProps } from '../types';
import { SpeciesTypeContainer } from './SpeciesTypeContainer';

const SpeciesTaxonomiesContainer = ({
  onChange,
  values,
  errors,
  disabled,
}: SpeciesTaxonomiesProps) => {
  const options = useSpeciesTree();
  const mapPath = getMapPath(disabled);

  return (
    <>
      <SimpleContainer title={inputLabels.checkSpeciesTerritories}>
        <Container>
          {!isEqual(values.type, RequestTypes.GET) && (
            <SpeciesTypeContainer
              disabled={disabled}
              speciesTypes={values.speciesTypes}
              handleChange={onChange}
            />
          )}
          {!isEmpty(options) && (
            <Tree
              error={errors?.taxonomies}
              label={inputLabels.species}
              disabled={disabled}
              treeData={options}
              values={values?.taxonomies || []}
              speciesTypes={values.speciesTypes}
              onChange={(taxonomies) => onChange(`taxonomies`, taxonomies)}
            />
          )}
          {!isEqual(values.type, RequestTypes.CHECK) && (
            <MapField
              allow="geolocation *"
              mapHost={mapsHost}
              value={values?.geom}
              mapPath={mapPath}
              error={errors?.geom}
              onChange={(data) => {
                onChange('geom', data);
              }}
              height={'300px'}
              accessibilityDescription="Interaktyvus žemėlapis objektų žymėjimui. Žemėlapis nėra visiškai prieinamas naudotojams su regėjimo negalia."
              accessibilityContact="Dėl žemėlapio duomenų prieinamumo, kreipkitės: sris@vstt.lt"
            />
          )}
        </Container>
      </SimpleContainer>
    </>
  );
};

export default SpeciesTaxonomiesContainer;
