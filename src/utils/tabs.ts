import { isEqual } from 'lodash';
import { Location } from 'react-router-dom';
import { Tab } from '../components/other/TabBar';
import { Resources } from './constants';
import { slugs } from './routes';

export const getActiveTab = (tabs: Tab[], location: Location) =>
  tabs.find((tab) => location.pathname.endsWith(tab.route))?.value;

export const getObservationTabs = (isTenantUser: boolean) =>
  [
    { label: 'Visos', value: Resources.FORMS, route: slugs.observationForms },
    {
      label: 'Mano',
      value: Resources.MY_FORMS,
      route: slugs.myObservationForms,
    },
  ].filter((tab) => {
    if (isEqual(tab.value, Resources.MY_FORMS)) return isTenantUser;

    return true;
  });

export const getRequestTabs = (isTenantUser: boolean, showDeletedRequestTab: boolean) =>
  [
    { label: 'Visi', value: Resources.REQUESTS, route: slugs.requests },
    { label: 'Mano', value: Resources.MY_REQUESTS, route: slugs.myRequests },
    {
      label: 'Panaikinto galiojimo',
      value: Resources.DELETED_REQUESTS,
      route: slugs.deletedRequests,
    },
  ].filter((tab) => {
    if (tab.value === Resources.MY_REQUESTS) return isTenantUser;
    if (tab.value === Resources.DELETED_REQUESTS) return showDeletedRequestTab;

    return true;
  });
