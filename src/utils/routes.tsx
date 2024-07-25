import styled from 'styled-components';
import Icon from '../components/other/Icons';
import ObservationForm from '../pages/ObservationForm';
import Observations from '../pages/Observations';
import MyObservations from '../pages/ObservationsMy';
import PlacesMap from '../pages/PlacesMap';
import ProfilePage from '../pages/Profile';
import ProfileId from '../pages/ProfileId';
import Profiles from '../pages/Profiles';
import RedirectToForm from '../pages/RedirectToForm';
import RequestForm from '../pages/RequestForm';
import Requests from '../pages/Requests';
import RequestsDeleted from '../pages/RequestsDeleted';
import RequestsMy from '../pages/RequestsMy';
import TenantForm from '../pages/Tenant';
import TenantUserForm from '../pages/TenantUserForm';
import TenantUsers from '../pages/TenantUsers';
import { Profile } from '../types';
import { handleIsTenantOwner, handleIsTenantUser } from './functions';
import { menuLabels, url } from './texts';

export const slugs = {
  cantLogin: '/negalima_jungtis',
  profile: '/profilis',
  tenant: '/imone',
  login: '/login',
  profiles: '/profiliai',
  observationForms: '/stebejimo-anketos',
  myObservationForms: '/stebejimo-anketos/mano',
  newForm: '/stebejimo-anketos/naujas',
  observationForm: (id: string) => `/stebejimo-anketos/${id}`,
  redirectToForm: (id: string) => `/rusys/anketa/rusis/${id}`,
  requests: `/prasymai`,
  myRequests: '/prasymai/mano',
  deletedRequests: '/prasymai/panaikinto-galiojimo',
  request: (id: string) => `/prasymai/${id}`,
  newRequest: '/prasymai/naujas',
  deletedRequest: (id: string) => `/prasymai/${id}/panaikinto-galiojimo`,
  tenantUsers: `/imones_darbuotojai`,
  tenantUser: (id?: string) => `/imones_darbuotojai/${id}`,
  newTenantUser: `/imones_darbuotojai/naujas`,
  placesMap: `/radavieciu-zemelapis`,
};

const StyledIcons = styled(Icon)`
  color: #cdd5df;
  font-size: 1.8rem;
`;

export const externalRoutes = [
  {
    label: menuLabels.observationForms,
    slug: slugs.observationForms,
    internal: true,
  },
  {
    label: menuLabels.requests,
    slug: slugs.requests,
    internal: true,
  },
  {
    label: 'Radaviečių žemėlapis',
    slug: slugs.placesMap,
    internal: true,
  },
  {
    label: 'Invazinės rūšys',
    slug: url.publicInva,
    icon: <StyledIcons name={'open'} />,
  },
  {
    label: 'Saugomos rūšys',
    slug: url.publicSris,
    icon: <StyledIcons name={'open'} />,
  },
];

const routes = [
  {
    label: menuLabels.observationForms,
    slug: slugs.observationForms,
    component: <Observations />,
  },
  {
    slug: slugs.myObservationForms,
    component: <MyObservations />,
    tenantUser: true,
  },
  {
    slug: slugs.observationForm(':id'),
    component: <ObservationForm />,
  },

  {
    label: menuLabels.requests,
    slug: slugs.requests,
    component: <Requests />,
  },
  {
    slug: slugs.myRequests,
    component: <RequestsMy />,
  },
  {
    slug: slugs.deletedRequests,
    component: <RequestsDeleted />,
  },

  {
    slug: slugs.request(':id'),
    component: <RequestForm />,
  },
  {
    slug: slugs.deletedRequest(':id'),
    component: <RequestForm />,
  },

  {
    label: menuLabels.profile,
    slug: slugs.profile,
    dropDown: true,
    component: <ProfilePage />,
  },
  {
    label: menuLabels.tenantUsers,
    slug: slugs.tenantUsers,
    dropDown: true,
    tenantOwner: true,
    component: <TenantUsers />,
  },
  {
    label: menuLabels.tenant,
    slug: slugs.tenant,
    dropDown: true,
    tenantOwner: true,
    component: <TenantForm />,
  },
  {
    slug: slugs.tenantUser(':id'),
    tenantOwner: true,
    component: <TenantUserForm />,
  },
  {
    slug: slugs.redirectToForm(':id'),
    component: <RedirectToForm />,
  },
  {
    slug: slugs.profiles,
    component: <Profiles />,
  },
  {
    slug: slugs.placesMap,
    component: <PlacesMap />,
  },
  import.meta.env.NODE_ENV === 'prod'
    ? {}
    : {
        slug: '/profiliai/:id',
        component: <ProfileId />,
      },
];

export const filteredRoutes = (profile?: Profile): any =>
  routes.filter((route) => {
    if (!route?.slug) return false;
    if (route.tenantOwner) {
      return handleIsTenantOwner(profile);
    }
    if (route.tenantUser) {
      return handleIsTenantUser(profile);
    }

    return true;
  });
