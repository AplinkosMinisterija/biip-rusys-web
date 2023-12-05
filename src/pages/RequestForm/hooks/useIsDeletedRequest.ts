import { useLocation } from 'react-router-dom';

export const useIsDeletedRequest = () => {
  const location = useLocation();
  return location.pathname.split('/').slice(-1)[0] === 'panaikinto-galiojimo';
};
