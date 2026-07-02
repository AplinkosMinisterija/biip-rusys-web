import { MapField } from '@aplinkosministerija/design-system';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Api, { NearbySpecies } from '../../../api';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import { mapsHost } from '../../../utils/constants';
import { formLabels } from '../../../utils/texts';
import { useNearbyPlaces } from '../hooks/useNearbyPlaces';
import { FormProps } from '../types';
import CloseSpeciesMap from './CloseSpeciesMap';

interface ObservationMapContainerProps {
  values: FormProps;
  errors: { [key: string]: any };
  disabled: boolean;
  mapQueryString: string;
  handleChange: (name: string, value: any) => void;
  hasMapAccess: boolean;
}

export const ObservationMapContainer = ({
  values,
  errors,
  disabled,
  mapQueryString,
  handleChange,
}: ObservationMapContainerProps) => {
  const placesFilter = useNearbyPlaces({ values, disabled });
  const [nearbySpeciesValues, setNearbySpeciesValues] = useState<NearbySpecies[]>([]);
  const [showClosePlaces, setShowClosePlaces] = useState(false);

  const filter = useMemo(
    () => (disabled ? undefined : { ...placesFilter, values: nearbySpeciesValues }),
    [disabled, nearbySpeciesValues, placesFilter],
  );

  const handleMapChange = useCallback(
    async (geom: FormProps['geom']) => {
      handleChange('geom', geom);
      setNearbySpeciesValues([]);

      try {
        const species = await Api.getNearbySpecies({ geom });
        setNearbySpeciesValues(species?.rows || []);
      } catch {
        setNearbySpeciesValues([]);
      }
    },
    [handleChange],
  );

  return (
    <SimpleContainer
      title={formLabels.map}
      additionalComponent={
          <ToggleMapLink
            onClick={(e) => {
              e.preventDefault();
              setShowClosePlaces(!showClosePlaces);
            }}
          >{showClosePlaces ? formLabels.showCurrentPlace : formLabels.showClosePlaces}
          </ToggleMapLink>
      }
    >
      {showClosePlaces ? (
        <CloseSpeciesMap geom={values?.geom} speciesId={values.species?.speciesId} />
      ) : (
        <MapField
          allow="geolocation *"
          mapHost={mapsHost}
          value={values?.geom}
          mapPath={mapQueryString}
          error={errors?.geom}
          filter={filter}
          onChange={handleMapChange}
          height={'300px'}
          accessibilityDescription="Interaktyvus žemėlapis objektų žymėjimui. Žemėlapis nėra visiškai prieinamas naudotojams su regėjimo negalia."
          accessibilityContact="Dėl žemėlapio duomenų prieinamumo, kreipkitės: sris@vstt.lt"
        />
      )}
    </SimpleContainer>
  );
};

const ToggleMapLink = styled.button`
  cursor: pointer;
  font-size: 1.4rem;
  border:1px solid lightgrey;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  color: rgb(35, 31, 32);
`;
