import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import Api from '../../../api';
import { ColumnButtonProps } from '../../../components/other/ColumnButton';
import { DynamicFilterProps } from '../../../components/other/DynamicFilter';
import { NotFoundProps } from '../../../components/other/NotFound';
import { ButtonInfo } from '../../../components/wrappers/PageWrapper';
import { actions as columnActions } from '../../../state/columns/reducer';
import { actions as filterActions } from '../../../state/filters/reducer';
import { useAppSelector, useGenericTablePageHooks, useTableData } from '../../../state/hooks';
import { myRequestFilterConfig, requestRowConfig } from '../../../utils/filterConfigs';
import { mapMyRequestFilters } from '../../../utils/filters';
import { useIsTenantUser, useShowDeleteRequestTab } from '../../../utils/hooks';
import { mapRequestList } from '../../../utils/mapFunctions';
import { slugs } from '../../../utils/routes';
import { getActiveTab, getRequestTabs } from '../../../utils/tabs';
import { buttonsTitles, emptyStateLabels, emptyStateUrlLabels } from '../../../utils/texts';

export const useData = () => {
  const { dispatch, navigate, page, location } = useGenericTablePageHooks();
  const filters = useAppSelector((state) => state.filters.myRequestFilters);
  const columns = useAppSelector((state) => state.columns.myRequest);
  const showDeletedTab = useShowDeleteRequestTab();
  const isTenantUser = useIsTenantUser();
  const tabs = getRequestTabs(isTenantUser, showDeletedTab);
  const activeTabValue = getActiveTab(tabs, location);

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
    isFilterApplied: !isEmpty(filters),
    rowConfig: requestRowConfig,
    onSetFilters: (filters: any) => dispatch(filterActions.setMyRequestFilters(filters)),
    filters: filters,
  };

  const columnInfo: ColumnButtonProps = {
    columns,
    handleToggle: (key) => dispatch(columnActions.toggleMyRequestColumns(key)),
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
