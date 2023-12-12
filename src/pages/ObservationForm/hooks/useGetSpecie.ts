import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import Api from './../../../api';
import { isNew } from './../../../utils/functions';

export const useGetSpecie = (id: string) => {
  const [searchParams] = useSearchParams();
  const { species } = Object.fromEntries([...Array.from(searchParams)]);

  const { data: specie, isFetching } = useQuery(
    ['specie', id],
    () => Api.getSpecieByQueryString(species),
    {
      enabled: !!species && !!isNew(id),
      refetchOnWindowFocus: false,
    },
  );

  return { specie, specieLoading: isFetching };
};
