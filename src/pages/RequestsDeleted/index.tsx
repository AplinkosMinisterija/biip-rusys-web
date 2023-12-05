import TabBar from '../../components/other/TabBar';
import Table from '../../components/tables/table';
import PageWrapper from '../../components/wrappers/PageWrapper';
import { pageTitles } from '../../utils/texts';
import { useData } from './hooks/useData';

const RequestsDeleted = () => {
  const {
    buttonInfo,
    filterInfo,
    notFoundInfo,
    columnInfo,
    tableData,
    loading,
    tabs,
    activeTabValue,
    handleNavigate,
  } = useData();

  return (
    <PageWrapper title={pageTitles.requests} buttonInfo={buttonInfo}>
      <>
        <TabBar tabs={tabs} activeTabValue={activeTabValue} />
        <Table
          loading={loading}
          filterInfo={filterInfo}
          notFoundInfo={notFoundInfo}
          columnInfo={columnInfo}
          data={tableData}
          onClick={(id: string) => handleNavigate(id)}
        />
      </>
    </PageWrapper>
  );
};

export default RequestsDeleted;
