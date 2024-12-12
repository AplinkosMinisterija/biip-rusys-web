import {
  ColumnButtonProps,
  Columns,
  DynamicFilterProps,
  useStorage,
} from '@aplinkosministerija/design-system';
import Api from '../../../api';
import { NotFoundProps } from '../../../components/other/NotFound';
import { ButtonInfo } from '../../../components/wrappers/PageWrapper';
import { useGenericTablePageHooks, useTableData } from '../../../state/hooks';
import { deletedRequestFilterConfig, requestRowConfig } from '../../../utils/filterConfigs';
import { mapDeletedRequestFilters } from '../../../utils/filters';
import { useIsTenantUser, useShowDeleteRequestTab } from '../../../utils/hooks';
import { mapRequestList } from '../../../utils/mapFunctions';
import { slugs } from '../../../utils/routes';
import { getActiveTab, getRequestTabs } from '../../../utils/tabs';
import {
  buttonsTitles,
  deletedRequestsLabels,
  emptyStateLabels,
  emptyStateUrlLabels,
  validationTexts,
} from '../../../utils/texts';

export const useData = () => {
  const { navigate, page, location } = useGenericTablePageHooks();

  const showDeletedTab = useShowDeleteRequestTab();
  const isTenantUser = useIsTenantUser();
  const tabs = getRequestTabs(isTenantUser, showDeletedTab);
  const activeTabValue = getActiveTab(tabs, location);
  const { value: filters, setValue: setFilters } = useStorage('deletedRequestFilters', {}, true);
  const { value: columns, setValue: setColumns } = useStorage<Columns>(
    'deletedRequestColumns',
    deletedRequestsLabels,
    true,
  );

  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.getDeletedRequests({
        page,
        filter: mapDeletedRequestFilters(filters),
      }),
    mapData: (list) => mapRequestList(list),
    dependencyArray: [page, filters, location.pathname],
    name: 'requestsDeleted',
  });

  const buttonInfo: ButtonInfo = {
    url: slugs.newRequest,
    loading,
    label: buttonsTitles.checkData,
  };

  const filterInfo: DynamicFilterProps = {
    loading,
    filterConfig: deletedRequestFilterConfig,
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

  const notFoundInfo: NotFoundProps = {
    url: slugs.newRequest,
    urlLabel: emptyStateUrlLabels.request,
    label: emptyStateLabels.accessRequest,
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
