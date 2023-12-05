import { isEmpty, isEqual } from 'lodash';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import Tree from '../../../components/fields/TreeSelect';
import DrawMap from '../../../components/map/DrawMap';
import { RequestTypes } from '../../../utils/constants';
import { inputLabels } from '../../../utils/texts';
import { getMapQueryString } from '../function';
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
  const mapQueryString = getMapQueryString(disabled);

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
            <DrawMap
              value={values?.geom}
              queryString={mapQueryString}
              error={errors?.geom}
              onSave={(data) => onChange('geom', data)}
              height={'300px'}
            />
          )}
        </Container>
      </SimpleContainer>
    </>
  );
};

export default SpeciesTaxonomiesContainer;
