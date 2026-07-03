import { Url } from '../../utils/constants';
import { useMapToken } from '../../utils/hooks';

interface UseSpeciesMapUrlProps {
  speciesId?: string | number;
  showAmateur?: boolean;
}

export const useSpeciesMapUrl = ({ speciesId, showAmateur = true }: UseSpeciesMapUrlProps = {}) => {
  const { mapToken, isFetching, invalidateMapToken } = useMapToken();
  const params = new URLSearchParams();

  if (mapToken) {
    params.append('auth', mapToken);
  }

  if (showAmateur) {
    params.append('amateur', 'true');
  }

  if (speciesId !== undefined && speciesId !== null) {
    params.append('species', `${speciesId}`);
  }

  const queryString = params.toString();
  const speciesMapUrl = queryString ? `${Url.SPECIES}?${queryString}` : Url.SPECIES;

  return {
    speciesMapUrl,
    isFetching,
    invalidateMapToken,
  };
};
