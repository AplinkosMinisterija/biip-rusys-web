import { MapField } from '@aplinkosministerija/design-system';
import { useState } from 'react';
import styled from 'styled-components';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import { mapsHost } from '../../../utils/constants';
import { formLabels } from '../../../utils/texts';
import { FormProps } from '../types';

interface ObservationMapContainerProps {
  values: FormProps;
  errors: { [key: string]: any };
  disabled: boolean;
  mapQueryString: string;
  handleChange: (name: string, value: any) => void;
}

const getMapPathWithSpecies = (mapPath: string, speciesId: number) => {
  const separator = mapPath.includes('?') ? '&' : '?';

  return `${mapPath}${separator}species=${speciesId}`;
};

export const ObservationMapContainer = ({
  values,
  errors,
  disabled,
  mapQueryString,
  handleChange,
}: ObservationMapContainerProps) => {
  const [showClosePlaces, setShowClosePlaces] = useState(false);
  const speciesId = values.species?.speciesId;
  const activeMapPath =
    showClosePlaces && speciesId ? getMapPathWithSpecies(mapQueryString, speciesId) : mapQueryString;

  const handleMapChange = (geom: FormProps['geom']) => {
    handleChange('geom', geom);
  };

  return (
    <SimpleContainer
      title={formLabels.map}
      additionalComponent={
        speciesId ? (
          <ToggleMapLink
            onClick={(e) => {
              e.preventDefault();
              setShowClosePlaces(!showClosePlaces);
            }}
          >
            {showClosePlaces ? formLabels.showCurrentPlace : formLabels.showClosePlaces}
          </ToggleMapLink>
        ) : undefined
      }
    >
      <MapField
        allow="geolocation *"
        mapHost={mapsHost}
        value={values?.geom}
        mapPath={activeMapPath}
        error={errors?.geom}
        onChange={handleMapChange}
        height={'300px'}
        accessibilityDescription="Interaktyvus žemėlapis objektų žymėjimui. Žemėlapis nėra visiškai prieinamas naudotojams su regėjimo negalia."
        accessibilityContact="Dėl žemėlapio duomenų prieinamumo, kreipkitės: sris@vstt.lt"
      />
    </SimpleContainer>
  );
};

const ToggleMapLink = styled.button`
  cursor: pointer;
  font-size: 1.4rem;
  border: 1px solid lightgrey;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  color: rgb(35, 31, 32);
`;
