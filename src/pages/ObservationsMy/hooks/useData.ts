import { isEmpty } from 'lodash';
import Api from '../../../api';
import { ColumnButtonProps } from '../../../components/other/ColumnButton';
import { DynamicFilterProps } from '../../../components/other/DynamicFilter';
import { NotFoundProps } from '../../../components/other/NotFound';
import { ButtonInfo } from '../../../components/wrappers/PageWrapper';
import { actions as columnActions } from '../../../state/columns/reducer';
import { actions } from '../../../state/filters/reducer';
import { useAppSelector, useGenericTablePageHooks, useTableData } from '../../../state/hooks';
import { myObservationFilterConfig, observationRowConfig } from '../../../utils/filterConfigs';
import { mapMyObservationFilters } from '../../../utils/filters';
import { useIsTenantUser } from '../../../utils/hooks';
import { mapObservationList } from '../../../utils/mapFunctions';
import { slugs } from '../../../utils/routes';
import { getActiveTab, getObservationTabs } from '../../../utils/tabs';
import { buttonsTitles, emptyStateLabels, emptyStateUrlLabels } from '../../../utils/texts';

export const useData = () => {
  const { location, dispatch, navigate, page } = useGenericTablePageHooks();
  const filters = useAppSelector((state) => state.filters.myFormFilters);
  const columns = useAppSelector((state) => state.columns.myObservation);
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
    isFilterApplied: !isEmpty(filters),
    rowConfig: observationRowConfig,
    onSetFilters: (filters: any) => dispatch(actions.setMyFormFilters(filters)),
    filters: filters,
  };

  const columnInfo: ColumnButtonProps = {
    columns,
    handleToggle: (key) => dispatch(columnActions.toggleMyObservationColumns(key)),
  };

  const notFoundInfo: NotFoundProps = {
    url: slugs.newForm,
    urlLabel: emptyStateUrlLabels.form,
    label: emptyStateLabels.form,
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
