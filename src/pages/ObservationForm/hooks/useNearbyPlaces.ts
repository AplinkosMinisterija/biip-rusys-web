import { useMemo } from 'react';
import { useQuery } from 'react-query';
import Api from '../../../api';
import { getGeomSignature, getNearbyPlaceIds } from '../components/ObservationMapContainer.utils';
import { FormProps } from '../types';

interface UseNearbyPlacesProps {
  values: FormProps;
  disabled: boolean;
}

export const useNearbyPlaces = ({ values, disabled }: UseNearbyPlacesProps) => {
  const speciesId = values.species?.speciesId;
  const geomSignature = useMemo(() => getGeomSignature(values.geom), [values.geom]);
  const enabled = !!speciesId && !!geomSignature && !disabled;

  const { data } = useQuery(
    ['nearbyPlaces', speciesId, geomSignature],
    () => Api.getNearbyPlaces({ speciesId, geom: values.geom }),
    { enabled, refetchOnWindowFocus: false, retry: false },
  );

  const places = useMemo(() => getNearbyPlaceIds(data?.rows), [data?.rows]);

  return useMemo(() => (disabled ? undefined : { places }), [disabled, places]);
};
