import { useIsTenantUser } from '../../../utils/hooks';
import { getFormTypes } from '../function';

export const useGetFormTypes = () => {
  const isTenantUser = useIsTenantUser();

  return getFormTypes(isTenantUser);
};
