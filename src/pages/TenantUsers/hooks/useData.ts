import { isEmpty } from 'lodash';
import Api from '../../../api';
import { ColumnButtonProps } from '../../../components/other/ColumnButton';
import { DynamicFilterProps } from '../../../components/other/DynamicFilter';
import { NotFoundProps } from '../../../components/other/NotFound';
import { ButtonInfo } from '../../../components/wrappers/PageWrapper';
import { actions as columnActions } from '../../../state/columns/reducer';
import { actions } from '../../../state/filters/reducer';
import { useAppSelector, useGenericTablePageHooks, useTableData } from '../../../state/hooks';
import { slugs } from '../../../utils/routes';
import { buttonsTitles, emptyStateLabels, emptyStateUrlLabels } from '../../../utils/texts';
import { filterConfig, rowConfig } from '../config';
import { mapUsers } from '../functions';

export const useData = () => {
  const { dispatch, navigate, page } = useGenericTablePageHooks();
  const filters = useAppSelector((state) => state.filters.userFilters);
  const columns = useAppSelector((state) => state.columns.tenantUser);

  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.getTenantUsers({
        page,
        filter: filters,
      }),
    mapData: (list) => mapUsers(list),
    dependencyArray: [page, filters],
    name: 'tenantUsers',
  });

  const buttonInfo: ButtonInfo = {
    url: slugs.newTenantUser,
    loading,
    label: buttonsTitles.inviteTenantUser,
  };

  const filterInfo: DynamicFilterProps = {
    loading,
    filterConfig: filterConfig(),
    isFilterApplied: !isEmpty(filters),
    rowConfig: rowConfig,
    onSetFilters: (filters: any) => dispatch(actions.setUserFilters(filters)),
    filters: filters,
  };

  const columnInfo: ColumnButtonProps = {
    columns,
    handleToggle: (key) => dispatch(columnActions.toggleTenantUserColumns(key)),
  };

  const notFoundInfo: NotFoundProps = {
    url: slugs.newTenantUser,
    urlLabel: emptyStateUrlLabels.user,
    label: emptyStateLabels.user,
  };

  return {
    notFoundInfo,
    columnInfo,
    filterInfo,
    buttonInfo,
    navigate,
    loading,
    tableData,
  };
};
