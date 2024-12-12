import { ColumnButton, DynamicFilter, Table } from '@aplinkosministerija/design-system';
import styled from 'styled-components';
import PageWrapper from '../../components/wrappers/PageWrapper';
import { ButtonVariants } from '../../styles';
import { TenantUserProps } from '../../types';
import { useGetSortedColumns } from '../../utils/hooks';
import { slugs } from '../../utils/routes';
import { pageTitles } from '../../utils/texts';
import { useData } from './hooks/useData';

const TenantUsers = () => {
  const { buttonInfo, filterInfo, navigate, notFoundInfo, columnInfo, tableData, loading } =
    useData();

  const { columns } = columnInfo;

  const sortedColumns = useGetSortedColumns(columns);

  return (
    <PageWrapper title={pageTitles.tenantUsers} buttonInfo={buttonInfo}>
      <>
        <Row>
          <InnerRow>
            <DynamicFilter {...filterInfo} />
            <ColumnButton {...columnInfo} variant={ButtonVariants.TRANSPARENT} />
          </InnerRow>
        </Row>
        <Table
          loading={loading}
          notFoundInfo={notFoundInfo}
          onClick={(tenantUser: TenantUserProps) => navigate(slugs.tenantUser(tenantUser.id))}
          data={tableData}
          columns={sortedColumns}
        />
      </>
    </PageWrapper>
  );
};

export default TenantUsers;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  margin: 16px 0;
`;

const InnerRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;
