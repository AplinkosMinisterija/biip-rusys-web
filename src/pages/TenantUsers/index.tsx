import Table from '../../components/tables/table';
import PageWrapper from '../../components/wrappers/PageWrapper';
import { slugs } from '../../utils/routes';
import { pageTitles } from '../../utils/texts';
import { useData } from './hooks/useData';

const TenantUsers = () => {
  const { buttonInfo, filterInfo, navigate, notFoundInfo, columnInfo, tableData, loading } =
    useData();

  return (
    <PageWrapper title={pageTitles.tenantUsers} buttonInfo={buttonInfo}>
      <Table
        loading={loading}
        filterInfo={filterInfo}
        notFoundInfo={notFoundInfo}
        columnInfo={columnInfo}
        onClick={(id: string) => navigate(slugs.tenantUser(id))}
        data={tableData}
      />
    </PageWrapper>
  );
};

export default TenantUsers;
