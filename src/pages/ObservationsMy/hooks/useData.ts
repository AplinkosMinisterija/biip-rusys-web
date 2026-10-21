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
import { myObservationFilterConfig, observationRowConfig } from '../../../utils/filterConfigs';
import { mapMyObservationFilters } from '../../../utils/filters';
import { useIsTenantUser } from '../../../utils/hooks';
import { mapObservationList } from '../../../utils/mapFunctions';
import { slugs } from '../../../utils/routes';
import { getActiveTab, getObservationTabs } from '../../../utils/tabs';
import {
  buttonsTitles,
  emptyStateLabels,
  emptyStateUrlLabels,
  myObservationFormLabels,
  validationTexts,
} from '../../../utils/texts';

export const useData = () => {
  const { location, navigate, page } = useGenericTablePageHooks();
  const { value: filters, setValue: setFilters } = useStorage('myFormFilters', {}, true);
  const { value: columns, setValue: setColumns } = useStorage<Columns>(
    'myFormColumns',
    myObservationFormLabels,
    true,
  );

  const isTenantUser = useIsTenantUser();
  const tabs = getObservationTabs(isTenantUser);
  const activeTabValue = getActiveTab(tabs, location);

  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.getMyObservationForms({
        filter: mapMyObservationFilters(filters),
        page,
      }),
    mapData: (list) => mapObservationList(list),
    dependencyArray: [page, filters, location.pathname],
    name: 'observationsMy',
  });

  const buttonInfo: ButtonInfo = {
    url: slugs.newForm,
    loading,
    label: buttonsTitles.newForm,
  };

  const filterInfo: DynamicFilterProps = {
    loading,
    filterConfig: myObservationFilterConfig,
    rowConfig: observationRowConfig,
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
    url: slugs.newForm,
    urlText: emptyStateUrlLabels.form,
    text: emptyStateLabels.form,
    onClick: () => {
      navigate(slugs.newForm);
    },
  };

  return {
    buttonInfo,
    filterInfo,
    navigate,
    notFoundInfo,
    columnInfo,
    tableData,
    loading,
    tabs,
    activeTabValue,
  };
};
