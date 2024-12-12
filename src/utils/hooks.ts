import { Columns } from '@aplinkosministerija/design-system';
import { useMediaQuery } from '@material-ui/core';
import { isEmpty, isEqual } from 'lodash';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Cookies from 'universal-cookie';
import { default as api } from '../api';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { actions as tenantAction } from '../state/tenant/reducer';
import { actions as userAction } from '../state/user/reducer';
import { actions } from '../state/users/reducer';
import { device } from '../styles';
import { Tenant, User } from '../types';
import { ServerErrorCodes } from './constants';
import {
  handleErrorFromServerToast,
  handleIsTenantOwner,
  handleIsTenantUser,
  sortDesktop,
  sortMobile,
} from './functions';
import { clearCookies, emptyUser, handleSetProfile } from './loginFunctions';
import { filteredRoutes } from './routes';

const cookies = new Cookies();

export const useFilteredRoutes = () => {
  return filteredRoutes(useGetCurrentProfile());
};

export const useGetCurrentProfile = () => {
  const profiles = useAppSelector((state) => state.user.userData.profiles);
  const profileId = cookies.get('profileId');
  const currentProfile = profiles?.find(
    (profile) => profile.id?.toString() === profileId?.toString(),
  );
  return currentProfile;
};

export const useIsTenantUser = () => {
  return handleIsTenantUser(useGetCurrentProfile());
};

export const useIsTenantOwner = () => {
  return handleIsTenantOwner(useGetCurrentProfile());
};

export const useGetSortedColumns = (columns: Columns) => {
  const isMobile = useMediaQuery(device.mobileL);

  const sortedColumns = Object.keys(columns)
    .sort((key, key2) =>
      isMobile ? sortMobile(columns, key, key2) : sortDesktop(columns, key, key2),
    )
    .reduce((obj, key) => {
      obj[key] = columns[key];
      return obj;
    }, {});

  return sortedColumns;
};

export const useUsers = () => {
  const users = useAppSelector((state) => state.users.list);
  const isTenantUser = useIsTenantUser();
  const dispatch = useAppDispatch();

  useQuery(['users'], () => api.getAllTenantUsers(), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: (list) => {
      dispatch(actions.setUsers(list));
    },
    enabled: isEmpty(users) || isTenantUser,
  });

  return users || [];
};

export const useShowDeleteRequestTab = () => {
  const [showDeletedRequestTab, setShowDeletedRequestTab] = useState(false);

  useQuery(['showDeletedRequestTab'], () => api.getDeletedRequests({}), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: (data) => {
      setShowDeletedRequestTab(!isEmpty(data?.rows || []));
    },
  });

  return showDeletedRequestTab;
};

export const useEGatesSign = () => {
  const { mutateAsync, isLoading } = useMutation(api.eGatesSign, {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: ({ url }) => {
      window.location.replace(url);
    },
    retry: false,
  });

  return { isLoading, mutateAsync };
};

export const useUserInfo = () => {
  const dispatch = useAppDispatch();
  const token = cookies.get('token');

  const { isLoading } = useQuery([token], () => api.getUserInfo(), {
    onError: ({ response }: any) => {
      if (isEqual(response.status, ServerErrorCodes.NO_PERMISSION)) {
        clearCookies();
        dispatch(userAction.setUser(emptyUser));

        return;
      }

      return handleErrorFromServerToast();
    },
    onSuccess: (data: User) => {
      if (data) {
        handleSetProfile(data.profiles);
        dispatch(userAction.setUser({ userData: data, loggedIn: true }));
      }
    },
    retry: false,
    enabled: !!token,
  });

  return { isLoading };
};

export const useTenantInfoMutation = () => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state?.user?.loggedIn);
  const profileId = cookies.get('profileId');

  const { isLoading } = useQuery(
    ['tenant', loggedIn, profileId],
    () => api.getTenantInfo(profileId),
    {
      onError: () => {
        handleErrorFromServerToast();
      },
      onSuccess: ({ name, code, phone, email, id }: Tenant) => {
        dispatch(tenantAction.setTenant({ id, name, code, phone, email }));
      },
      retry: false,
      enabled: loggedIn && !isNaN(profileId),
    },
  );

  return { isLoading };
};

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation(() => api.logout(), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: () => {
      clearCookies();
      dispatch(userAction.setUser(emptyUser));
    },
  });

  return { mutateAsync };
};
