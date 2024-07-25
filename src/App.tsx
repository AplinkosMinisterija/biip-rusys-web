import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import {
  Location,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import api from './api';
import DefaultLayout from './components/layouts/DefaultLayout';
import LoaderComponent from './components/other/LoaderComponent';
import { CantLogin } from './pages/CantLogin';
import { Login } from './pages/Login';
import { useAppSelector } from './state/hooks';
import { ProfileId } from './types';
import { isProfileFullyCompleted, isTenantFullyCompleted } from './utils/functions';
import {
  useEGatesSign,
  useFilteredRoutes,
  useGetCurrentProfile,
  useIsTenantOwner,
  useTenantInfoMutation,
  useUserInfo,
} from './utils/hooks';
import { clearCookies, handleUpdateTokens } from './utils/loginFunctions';
import { slugs } from './utils/routes';

const cookies = new Cookies();

interface RouteProps {
  loggedIn: boolean;
  profileId?: ProfileId;
  location?: Location;
}

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const user = useAppSelector((state) => state.user.userData);
  const tenant = useAppSelector((state) => state.tenant);
  const profiles = useAppSelector((state) => state.user.userData.profiles);
  const [searchParams] = useSearchParams();
  const { ticket, eGates } = Object.fromEntries([...Array.from(searchParams)]);
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const routes = useFilteredRoutes();
  const token = cookies.get('token');
  const currentProfile = useGetCurrentProfile();
  const isTenantOwner = useIsTenantOwner();
  const profileId = currentProfile?.id;

  const publicSlugs = [slugs.profiles, slugs.login, '/evartai'];

  const isPublicSlug = publicSlugs.some((slug) => location.pathname.includes(slug));

  const isInvalidProfile =
    profileId &&
    !profiles
      ?.map((profile) => {
        return profile?.id;
      })
      .includes(profileId) &&
    loggedIn;

  const updateTokensMutation = useMutation(api.refreshToken, {
    onError: () => {
      clearCookies();
    },
    onSuccess: (data) => {
      handleUpdateTokens(data);
    },
  });

  const updateTokensMutationMutateAsyncFunction = updateTokensMutation.mutateAsync;

  const shouldUpdateTokens = useCallback(async () => {
    if (!cookies.get('token') && cookies.get('refreshToken')) {
      await updateTokensMutationMutateAsyncFunction();
    }
  }, [updateTokensMutationMutateAsyncFunction]);

  const { mutateAsync: eGateSignsMutation, isLoading: eGatesSignLoading } = useEGatesSign();

  const { isLoading: userInfoLoading } = useUserInfo();
  const { isLoading: tenantInfoLoading } = useTenantInfoMutation();

  const eGatesLoginMutation = useMutation((ticket: string) => api.eGatesLogin({ ticket }), {
    onError: () => {
      navigate(slugs.cantLogin);
    },
    onSuccess: (data) => {
      handleUpdateTokens(data);
    },
    retry: false,
  });

  useEffect(() => {
    if (userInfoLoading || tenantInfoLoading || isPublicSlug || eGatesLoginMutation.isLoading)
      return;

    if (profileId && !isProfileFullyCompleted(user)) {
      return navigate(slugs.profile);
    }
    if (isTenantOwner && !isTenantFullyCompleted(tenant)) {
      return navigate(slugs.tenant);
    }
  }, [
    location.pathname,
    navigate,
    profileId,
    isPublicSlug,
    isTenantOwner,
    userInfoLoading,
    eGatesLoginMutation.isLoading,
    tenantInfoLoading,
    user,
    tenant,
  ]);

  const isLoading = [
    initialLoading,
    eGatesLoginMutation.isLoading,
    tenantInfoLoading,
    userInfoLoading,
    eGatesSignLoading,
    updateTokensMutation.isLoading,
  ].some((loading) => loading);

  useEffect(() => {
    (async () => {
      await shouldUpdateTokens();
      setInitialLoading(false);
    })();
  }, [token, shouldUpdateTokens]);

  const eGatesLoginMutationMutateAsync = eGatesLoginMutation.mutateAsync;

  useEffect(() => {
    if (loggedIn) return;

    if (ticket) {
      eGatesLoginMutationMutateAsync(ticket);
    }
    if (eGates !== undefined) {
      eGateSignsMutation();
    }
  }, [ticket, eGates, eGateSignsMutation, eGatesLoginMutationMutateAsync, loggedIn]);

  useEffect(() => {
    if (!isEqual(profileId, 'expert')) return;

    console.error(profileId, 'token exists?', !!token);
  }, [profileId, token]);

  useEffect(() => {
    if (isInvalidProfile) {
      cookies.remove('profileId', { path: '/' });
      navigate('/');
      return;
    }

    if (!loggedIn && !userInfoLoading) {
      if (!isPublicSlug) {
        cookies.set('redirectPathname', location.pathname, { path: '/' });
      }
    }

    if (loggedIn && profileId && cookies.get('redirectPathname') && !isLoading) {
      navigate(cookies.get('redirectPathname'));

      cookies.remove('redirectPathname', { path: '/' });
    }
  }, [
    profileId,
    loggedIn,
    isInvalidProfile,
    isPublicSlug,
    navigate,
    isLoading,
    userInfoLoading,
    location.pathname,
  ]);

  const getDefaultRoute = () => {
    if (!loggedIn) return '/login';

    if (!profileId) return slugs.profiles;

    return slugs.observationForms;
  };

  return (
    <>
      {!isLoading ? (
        <DefaultLayout loggedIn={loggedIn}>
          <>
            <Routes>
              <Route element={<PublicRoute profileId={profileId} loggedIn={loggedIn} />}>
                <Route path="/login" element={<Login />} />
                <Route path={slugs.cantLogin} element={<CantLogin />} />
              </Route>
              <Route
                element={
                  <ProtectedRoute location={location} profileId={profileId} loggedIn={loggedIn} />
                }
              >
                {(routes || []).map((route, index) => (
                  <Route key={`route-${index}`} path={route.slug} element={route.component} />
                ))}
              </Route>
              <Route path="*" element={<Navigate to={getDefaultRoute()} />} />
            </Routes>
            <ToastContainer />
          </>
        </DefaultLayout>
      ) : (
        <LoaderComponent />
      )}
    </>
  );
}

const PublicRoute = ({ loggedIn, profileId }: RouteProps) => {
  if (loggedIn) {
    return <Navigate to={profileId ? slugs.observationForms : slugs.profiles} replace />;
  }

  return <Outlet />;
};

const ProtectedRoute = ({ loggedIn, profileId, location }: RouteProps) => {
  if (!loggedIn) {
    return <Navigate to={'/login'} replace />;
  }

  if (location?.pathname === slugs.profiles && !!profileId) {
    return <Navigate to={slugs.observationForms} replace />;
  }

  return <Outlet />;
};

export default App;
