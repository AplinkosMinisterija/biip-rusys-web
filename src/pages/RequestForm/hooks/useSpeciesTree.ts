import { useQuery } from 'react-query';
import Api from '../../../api';
import { handleErrorFromServerToast } from '../../../utils/functions';

export const useSpeciesTree = () => {
  const { data } = useQuery(['speciesTree'], () => Api.getSpeciesTree(), {
    onError: () => {
      handleErrorFromServerToast();
    },
    staleTime: Infinity,
  });

  return data;
};
