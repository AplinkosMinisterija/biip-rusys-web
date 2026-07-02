import { MapField } from '@aplinkosministerija/design-system';
import { useMemo, useState } from 'react';
import SimpleContainer from '../../../components/containers/SimpleContainer';
import DisplayMap from '../../../components/map/DisplayMap';
import { mapsHost, Url } from '../../../utils/constants';
import { formLabels } from '../../../utils/texts';
import { FormProps } from '../types';
import { ToggleBtn } from './ToggleButton';

interface ObservationMapContainerProps {
  values: FormProps;
  errors: { [key: string]: any };
  disabled: boolean;
  mapQueryString: string;
  handleChange: (name: string, value: any) => void;
}

export const ObservationMapContainer = ({
  values,
  errors,
  mapQueryString,
  handleChange,
}: ObservationMapContainerProps) => {
  const [showClosePlaces, setShowClosePlaces] = useState(false);
  const speciesId = values.species?.speciesId;
  const closeSpeciesMapSrc = useMemo(() => {
    if (!speciesId) return '';

    const query = mapQueryString.split('?')[1] || '';
    const authToken = new URLSearchParams(query).get('auth');
    if (!authToken) return '';

    const params = new URLSearchParams();
    params.append('auth', authToken);
    params.append('species', `${speciesId}`);

    return `${Url.SPECIES}?${params.toString()}`;
  }, [mapQueryString, speciesId]);

  const handleMapChange = (geom: FormProps['geom']) => {
    handleChange('geom', geom);
  };

  return (
    <SimpleContainer
      title={formLabels.map}
      additionalComponent={
        speciesId ? (
          <ToggleBtn
            onClick={(e) => {
              e.preventDefault();
              setShowClosePlaces(!showClosePlaces);
            }}
          >
            {showClosePlaces ? formLabels.showCurrentPlace : formLabels.showClosePlaces}
          </ToggleBtn>
        ) : undefined
      }
    >
      {showClosePlaces ? (
        <DisplayMap height="300px" geom={values?.geom} src={closeSpeciesMapSrc} />
      ) : (
        <MapField
          allow="geolocation *"
          mapHost={mapsHost}
          value={values?.geom}
          mapPath={mapQueryString}
          error={errors?.geom}
          onChange={handleMapChange}
          height={'300px'}
          accessibilityDescription="Interaktyvus žemėlapis objektų žymėjimui. Žemėlapis nėra visiškai prieinamas naudotojams su regėjimo negalia."
          accessibilityContact="Dėl žemėlapio duomenų prieinamumo, kreipkitės: sris@vstt.lt"
        />
      )}
    </SimpleContainer>
  );
};
