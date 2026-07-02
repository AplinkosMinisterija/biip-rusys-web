import Cookies from 'universal-cookie';


const cookies = new Cookies();
const mapToken = cookies.get('mapToken');


export const getMapQueryString = (speciesId) => {
  if (!mapToken) return '';

  const queryString = `?`;
  const param = new URLSearchParams();

  param.append('auth', mapToken);
  param.append('species', speciesId!);
  return queryString + param;
};
