import { useMediaQuery } from '@material-ui/core';
import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles';
import { getActiveColumns } from '../../utils/functions';
import { useGetSortedColumns } from '../../utils/hooks';
import ColumnButton, { ColumnButtonProps } from '../other/ColumnButton';
import DynamicFilter from '../other/DynamicFilter';
import Icon from '../other/Icons';
import LoaderComponent from '../other/LoaderComponent';
import NotFound, { NotFoundProps } from '../other/NotFound';
import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';

export interface TableRow {
  id?: string;
  [key: string]: any;
}

export interface TableData {
  data: TableRow[];
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

interface DynamicFilterProps {
  isFilterApplied: boolean;
  filterConfig: any;
  rowConfig: string[][];
  onSetFilters: (filters: any) => void;
  filters: any;
}

export interface LoginLayoutProps {
  data: TableData;
  onClick?: (id: string) => void;
  tableRowStyle?: any;
  customPageName?: string;
  loading?: boolean;
  rightButtons?: JSX.Element;
  filterInfo: DynamicFilterProps;
  columnInfo: ColumnButtonProps;
  notFoundInfo: NotFoundProps;
}

const Table = ({
  data,
  onClick,
  tableRowStyle,
  customPageName,
  rightButtons,
  loading,
  filterInfo,
  columnInfo,
  notFoundInfo,
}: LoginLayoutProps) => {
  const { label, urlLabel, url } = notFoundInfo;
  const { handleToggle, columns } = columnInfo;
  const { filterConfig, rowConfig, isFilterApplied, onSetFilters, filters } = filterInfo;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...Array.from(searchParams)]);
  const totalPages = data?.totalPages || 0;
  const showPagination = !isEmpty(data?.data);
  const page = customPageName ? customPageName : 'page';
  const isMobile = useMediaQuery(device.mobileL);
  const pageRange = isMobile ? 1 : 3;
  const pageMargin = isMobile ? 1 : 3;
  const sortedColumns = useGetSortedColumns(columns);
  const activeColumns = getActiveColumns(sortedColumns);
  const navigateRef = useRef(navigate);
  const handleRowClick = (row: TableRow) => {
    if (onClick && row.id) {
      onClick(row.id);
    }
  };

  useEffect(() => {
    if (!loading && totalPages < parseInt(params?.page) && navigateRef?.current) {
      navigateRef.current({
        search: `?${createSearchParams({
          ...params,
          [page]: '1',
        })}`,
      });
    }
  }, [searchParams, data, loading, totalPages, params, page]);

  const notFoundComponent = <NotFound label={label} url={url} urlLabel={urlLabel} />;

  if (loading) return <LoaderComponent />;

  return (
    <>
      <Row>
        <InnerRow>
          {filterInfo && (
            <DynamicFilter
              filters={filters}
              filterConfig={filterConfig}
              rowConfig={rowConfig}
              onSetFilters={onSetFilters}
              loading={loading}
            />
          )}
          {columnInfo && <ColumnButton handleToggle={handleToggle} columns={sortedColumns} />}
        </InnerRow>

        {rightButtons}
      </Row>

      <Container>
        {isMobile ? (
          <MobileTable
            data={data?.data}
            columns={activeColumns}
            handleRowClick={handleRowClick}
            tableRowStyle={tableRowStyle}
            emptyStateComponent={notFoundComponent}
            isFilterApplied={isFilterApplied}
          />
        ) : (
          <DesktopTable
            data={data?.data}
            columns={activeColumns}
            handleRowClick={handleRowClick}
            tableRowStyle={tableRowStyle}
            emptyStateComponent={notFoundComponent}
            isFilterApplied={isFilterApplied}
          />
        )}
        {showPagination && (
          <StyledReactPaginate
            pageCount={totalPages || 1}
            pageRangeDisplayed={pageRange}
            marginPagesDisplayed={pageMargin}
            forcePage={parseInt(params?.[page]) - 1 || 0}
            onPageChange={(e) =>
              navigate({
                search: `?${createSearchParams({
                  ...params,
                  [page]: (e.selected + 1).toString(),
                })}`,
              })
            }
            containerClassName="pagination"
            activeClassName="active"
            pageLinkClassName="page-link"
            breakLinkClassName="page-link"
            nextLinkClassName="page-link"
            previousLinkClassName="page-link"
            pageClassName="page-item"
            breakClassName="page-item"
            nextClassName="page-item"
            previousClassName="page-item"
            previousLabel={<StyledIcon name="backward" />}
            nextLabel={<StyledIcon name="forward" />}
          />
        )}
      </Container>
    </>
  );
};

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

const Container = styled.div`
  background-color: white;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-x: auto;
  @media ${device.mobileL} {
    align-items: center;
  }
`;

const StyledIcon = styled(Icon)`
  color: #9aa4b2;
  font-size: 1.4rem;
  cursor: pointer;
`;

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 17px 0;

  .page-link {
    min-width: 32px;
    height: 32px;
    margin: 0 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    color: #231f20;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: Atkinson Hyperlegible;
    cursor: pointer;
  }

  .active a {
    background: ${({ theme }) => theme.colors.primary} 0% 0% no-repeat padding-box !important;
    border-radius: 4px;
    border: none;
    color: white;
  }
`;

export default Table;
