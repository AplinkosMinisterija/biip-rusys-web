import DisplayMap from '../components/map/DisplayMap';
import { useSpeciesMapUrl } from '../components/map/useSpeciesMapUrl';

const PlacesMap = () => {
  const { speciesMapUrl, isFetching, invalidateMapToken } = useSpeciesMapUrl();

  return (
    <DisplayMap
      height={'100%'}
      src={speciesMapUrl}
      isFetching={isFetching}
      onInvalidToken={invalidateMapToken}
    />
  );
};

export default PlacesMap;
