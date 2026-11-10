import {
  ColumnButtonProps,
  Columns,
  DynamicFilterProps,
  NotFoundInfoProps,
  useStorage,
} from '@aplinkosministerija/design-system';
import Api from '../../../api';
import { ButtonInfo } from '../../../components/wrappers/PageWrapper';
import { useGenericTablePageHooks, useTableData } from '../../../state/hooks';
import { slugs } from '../../../utils/routes';
import {
  buttonsTitles,
  emptyStateLabels,
  emptyStateUrlLabels,
  tenantUsersLabels,
  validationTexts,
} from '../../../utils/texts';
import { filterConfig, rowConfig } from '../config';
import { mapUsers } from '../functions';

export const useData = () => {
  const { navigate, page } = useGenericTablePageHooks();

  const { value: filters, setValue: setFilters } = useStorage('userFilters', {}, true);
  const { value: columns, setValue: setColumns } = useStorage<Columns>(
    'userColumns',
    tenantUsersLabels,
    true,
  );

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
    rowConfig: rowConfig,
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
    url: slugs.newTenantUser,
    urlText: emptyStateUrlLabels.user,
    text: emptyStateLabels.user,
    onClick: () => {
      navigate(slugs.newTenantUser);
    },
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
