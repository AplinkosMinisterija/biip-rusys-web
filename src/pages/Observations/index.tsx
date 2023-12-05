import TabBar from '../../components/other/TabBar';
import Table from '../../components/tables/table';
import PageWrapper from '../../components/wrappers/PageWrapper';
import { slugs } from '../../utils/routes';
import { pageTitles } from '../../utils/texts';
import { useData } from './hooks/useData';

const Observations = () => {
  const {
    buttonInfo,
    filterInfo,
    navigate,
    notFoundInfo,
    columnInfo,
    tableData,
    loading,
    tabs,
    activeTabValue,
  } = useData();

  return (
    <PageWrapper title={pageTitles.forms} buttonInfo={buttonInfo}>
      <>
        <TabBar tabs={tabs} activeTabValue={activeTabValue} />
        <Table
          loading={loading}
          filterInfo={filterInfo}
          notFoundInfo={notFoundInfo}
          columnInfo={columnInfo}
          onClick={(id: string) => navigate(slugs.observationForm(id))}
          data={tableData}
        />
      </>
    </PageWrapper>
  );
};

export default Observations;
