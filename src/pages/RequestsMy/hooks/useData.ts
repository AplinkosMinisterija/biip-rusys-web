import {
  ColumnButtonProps,
  Columns,
  DynamicFilterProps,
  NotFoundInfoProps,
  useStorage,
} from '@aplinkosministerija/design-system';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import Api from '../../../api';
import { ButtonInfo } from '../../../components/wrappers/PageWrapper';
import { useGenericTablePageHooks, useTableData } from '../../../state/hooks';
import { myRequestFilterConfig, requestRowConfig } from '../../../utils/filterConfigs';
import { mapMyRequestFilters } from '../../../utils/filters';
import { useIsTenantUser, useShowDeleteRequestTab } from '../../../utils/hooks';
import { mapRequestList } from '../../../utils/mapFunctions';
import { slugs } from '../../../utils/routes';
import { getActiveTab, getRequestTabs } from '../../../utils/tabs';
import {
  buttonsTitles,
  emptyStateLabels,
  emptyStateUrlLabels,
  myRequestsLabels,
  validationTexts,
} from '../../../utils/texts';

export const useData = () => {
  const { navigate, page, location } = useGenericTablePageHooks();

  const showDeletedTab = useShowDeleteRequestTab();
  const isTenantUser = useIsTenantUser();
  const tabs = getRequestTabs(isTenantUser, showDeletedTab);
  const activeTabValue = getActiveTab(tabs, location);
  const { value: filters, setValue: setFilters } = useStorage('myRequestFilters', {}, true);
  const { value: columns, setValue: setColumns } = useStorage<Columns>(
    'myRequest',
    myRequestsLabels,
    true,
  );

  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.getMyRequests({
        page,
        filter: mapMyRequestFilters(filters),
      }),
    mapData: (list) => mapRequestList(list),
    dependencyArray: [page, filters, location.pathname],
    name: 'requestsMy',
  });
  const redirectToRequests = !loading && isEmpty(filters) && isEmpty(tableData.data);

  useEffect(() => {
    if (redirectToRequests) {
      navigate(slugs.requests);
    }
  }, [redirectToRequests, navigate]);

  const buttonInfo: ButtonInfo = {
    url: slugs.newRequest,
    loading,
    label: buttonsTitles.checkData,
  };

  const filterInfo: DynamicFilterProps = {
    loading,
    filterConfig: myRequestFilterConfig,
    rowConfig: requestRowConfig,
    onSetFilters: setFilters,
    filters: filters,
    texts: {
      clearAll: buttonsTitles.clearAll,
      filter: buttonsTitles.filter,
    },
  };

  const columnInfo: ColumnButtonProps = {
    columns,
    onToggle: setColumns,
    texts: {
      columns: buttonsTitles.columns,
      atLeastOneColumn: validationTexts.atLeastOneColumn,
    },
  };

  const notFoundInfo: NotFoundInfoProps = {
    url: slugs.newRequest,
    urlText: emptyStateUrlLabels.request,
    text: emptyStateLabels.accessRequest,
    onClick: () => {
      navigate(slugs.newRequest);
    },
  };

  return {
    buttonInfo,
    filterInfo,
    notFoundInfo,
    columnInfo,
    tableData,
    loading,
    isTenantUser,
    tabs,
    activeTabValue,
    navigate,
  };
};
