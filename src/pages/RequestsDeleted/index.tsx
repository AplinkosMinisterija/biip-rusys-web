import { ColumnButton, DynamicFilter, Table } from '@aplinkosministerija/design-system';
import styled from 'styled-components';
import TabBar from '../../components/other/TabBar';
import PageWrapper from '../../components/wrappers/PageWrapper';
import { ButtonVariants } from '../../styles';
import { Request } from '../../types';
import { useGetSortedColumns } from '../../utils/hooks';
import { slugs } from '../../utils/routes';
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
    navigate,
  } = useData();

  const { columns } = columnInfo;

  const sortedColumns = useGetSortedColumns(columns);

  return (
    <PageWrapper title={pageTitles.requests} buttonInfo={buttonInfo}>
      <>
        <TabBar tabs={tabs} activeTabValue={activeTabValue} />
        <Row>
          <InnerRow>
            <DynamicFilter {...filterInfo} />
            <ColumnButton {...columnInfo} variant={ButtonVariants.TRANSPARENT} />
          </InnerRow>
        </Row>
        <Table
          loading={loading}
          notFoundInfo={notFoundInfo}
          onClick={(request: Request) => navigate(slugs.deletedRequest(request.id))}
          data={tableData}
          columns={sortedColumns}
        />
      </>
    </PageWrapper>
  );
};

export default RequestsDeleted;

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
