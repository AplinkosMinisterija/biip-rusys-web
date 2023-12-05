import { isEmpty } from 'lodash';
import Api from '../../../api';
import { ColumnButtonProps } from '../../../components/other/ColumnButton';
import { DynamicFilterProps } from '../../../components/other/DynamicFilter';
import { NotFoundProps } from '../../../components/other/NotFound';
import { ButtonInfo } from '../../../components/wrappers/PageWrapper';
import { actions as columnActions } from '../../../state/columns/reducer';
import { actions as filterActions } from '../../../state/filters/reducer';
import { useAppSelector, useGenericTablePageHooks, useTableData } from '../../../state/hooks';
import { requestFilterConfig, requestRowConfig } from '../../../utils/filterConfigs';
import { mapRequestFilters } from '../../../utils/filters';
import { useIsTenantUser, useShowDeleteRequestTab, useUsers } from '../../../utils/hooks';
import { mapRequestList } from '../../../utils/mapFunctions';
import { slugs } from '../../../utils/routes';
import { getActiveTab, getRequestTabs } from '../../../utils/tabs';
import { buttonsTitles, emptyStateLabels, emptyStateUrlLabels } from '../../../utils/texts';

export const useData = () => {
  const { dispatch, navigate, page, location } = useGenericTablePageHooks();
  const filters = useAppSelector((state) => state.filters.requestFilters);
  const columns = useAppSelector((state) => state.columns.request);
  const showDeletedTab = useShowDeleteRequestTab();
  const isTenantUser = useIsTenantUser();
  const tabs = getRequestTabs(isTenantUser, showDeletedTab);
  const activeTabValue = getActiveTab(tabs, location);

  const users = useUsers();
  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.getRequests({
        page,
        filter: mapRequestFilters(filters),
      }),
    mapData: (list) => mapRequestList(list),
    dependencyArray: [page, filters, location.pathname],
    name: 'requests',
  });

  const buttonInfo: ButtonInfo = {
    url: slugs.newRequest,
    loading,
    label: buttonsTitles.checkData,
  };

  const filterInfo: DynamicFilterProps = {
    loading,
    filterConfig: requestFilterConfig(users),
    isFilterApplied: !isEmpty(filters),
    rowConfig: requestRowConfig,
    onSetFilters: (filters: any) => dispatch(filterActions.setRequestFilters(filters)),
    filters: filters,
  };

  const columnInfo: ColumnButtonProps = {
    columns,
    handleToggle: (key) => dispatch(columnActions.toggleRequestColumns(key)),
  };

  const notFoundInfo: NotFoundProps = {
    url: slugs.newRequest,
    urlLabel: emptyStateUrlLabels.request,
    label: emptyStateLabels.accessRequest,
  };

  const handleNavigate = (id: string) => {
    navigate(slugs.request(id));
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
    handleNavigate,
  };
};
