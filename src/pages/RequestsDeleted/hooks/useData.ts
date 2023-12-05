import { isEmpty } from 'lodash';
import Api from '../../../api';
import { ColumnButtonProps } from '../../../components/other/ColumnButton';
import { DynamicFilterProps } from '../../../components/other/DynamicFilter';
import { NotFoundProps } from '../../../components/other/NotFound';
import { ButtonInfo } from '../../../components/wrappers/PageWrapper';
import { actions as columnActions } from '../../../state/columns/reducer';
import { actions as filterActions } from '../../../state/filters/reducer';
import { useAppSelector, useGenericTablePageHooks, useTableData } from '../../../state/hooks';
import { deletedRequestFilterConfig, requestRowConfig } from '../../../utils/filterConfigs';
import { mapDeletedRequestFilters } from '../../../utils/filters';
import { useIsTenantUser, useShowDeleteRequestTab } from '../../../utils/hooks';
import { mapRequestList } from '../../../utils/mapFunctions';
import { slugs } from '../../../utils/routes';
import { getActiveTab, getRequestTabs } from '../../../utils/tabs';
import { buttonsTitles, emptyStateLabels, emptyStateUrlLabels } from '../../../utils/texts';

export const useData = () => {
  const { dispatch, navigate, page, location } = useGenericTablePageHooks();
  const filters = useAppSelector((state) => state.filters.deletedRequestFilters);
  const columns = useAppSelector((state) => state.columns.deletedRequest);
  const showDeletedTab = useShowDeleteRequestTab();
  const isTenantUser = useIsTenantUser();
  const tabs = getRequestTabs(isTenantUser, showDeletedTab);
  const activeTabValue = getActiveTab(tabs, location);

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
    isFilterApplied: !isEmpty(filters),
    rowConfig: requestRowConfig,
    onSetFilters: (filters: any) => dispatch(filterActions.setDeletedRequestFilters(filters)),
    filters: filters,
  };

  const columnInfo: ColumnButtonProps = {
    columns,
    handleToggle: (key) => dispatch(columnActions.toggleDeletedRequestColumns(key)),
  };

  const notFoundInfo: NotFoundProps = {
    url: slugs.newRequest,
    urlLabel: emptyStateUrlLabels.request,
    label: emptyStateLabels.accessRequest,
  };

  const handleNavigate = (id: string) => {
    navigate(slugs.deletedRequest(id));
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
