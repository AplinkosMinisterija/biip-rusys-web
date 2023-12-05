import { isEmpty, map } from 'lodash';
import styled from 'styled-components';
import { Columns } from '../../types';
import { TableItemWidth } from '../../utils/constants';
import { descriptions } from '../../utils/texts';
import { TableRow } from './table';

export interface DesktopTableProps {
  data: TableRow[];
  columns: Columns;
  emptyStateComponent?: JSX.Element;
  tableRowStyle?: any;
  customPageName?: string;
  isFilterApplied?: boolean;
  handleRowClick: (row: TableRow) => void;
}

const DesktopTable = ({
  data,
  columns,
  emptyStateComponent,
  tableRowStyle,
  isFilterApplied = false,
  handleRowClick,
}: DesktopTableProps) => {
  const keys = Object.keys(columns);
  const generateTableContent = () => {
    if (!isEmpty(data)) {
      return map(data, (row: TableRow, index: number) => (
        <TR
          $pointer={true}
          key={`tr-${index}`}
          onClick={() => handleRowClick(row)}
          style={tableRowStyle}
        >
          {keys.map((label, i: number) => {
            const item = row[label] || '-';
            const width = columns[label]?.width || TableItemWidth.LARGE;
            return (
              <TD maxWidth={width} key={`tr-td-${i}`}>
                {item}
              </TD>
            );
          })}
        </TR>
      ));
    } else if (isFilterApplied) {
      return (
        <TR $pointer={false} $hide_border={true}>
          <TdSecond colSpan={keys.length}>{descriptions.tableNotFound}</TdSecond>
        </TR>
      );
    } else {
      return (
        <TR $pointer={false} $hide_border={true}>
          <TdSecond colSpan={keys.length}>{emptyStateComponent}</TdSecond>
        </TR>
      );
    }
  };

  return (
    <TableContainer>
      <Table>
        <THEAD>
          <TR $pointer={false}>
            {keys.map((key: any, i: number) => {
              const item = columns[key]?.label;
              const width = columns[key]?.width || TableItemWidth.LARGE;

              return (
                <TH maxWidth={width} key={`large-th-${i}`}>
                  {item}
                </TH>
              );
            })}
          </TR>
        </THEAD>

        <StyledTbody>{generateTableContent()}</StyledTbody>
      </Table>
    </TableContainer>
  );
};

const StyledTbody = styled.tbody`
  width: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TD = styled.td<{ maxWidth: string }>`
  padding: 6px 22px;
  max-width: ${({ maxWidth }) => maxWidth};
  height: 44px;
  text-align: left;
  font-size: 1.4rem;
  color: #121926;
`;

const TH = styled.th<{ maxWidth: string }>`
  padding: 18px 22px;
  height: 44px;
  max-width: ${({ maxWidth }) => maxWidth};
  text-align: left;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.29px;
  color: #4b5565;
`;

const TdSecond = styled.td`
  padding: 13px 12px;
  text-align: left;
  font-size: 1.4rem;
  color: #121926;
`;

const THEAD = styled.thead`
  width: 100%;
`;

const TR = styled.tr<{
  $hide_border?: boolean;
  $pointer: boolean;
}>`
  border: none;

  border-bottom: ${({ $hide_border }) => ($hide_border ? 'none' : '1px solid #cdd5df')};
  cursor: ${({ $pointer }) => ($pointer ? 'pointer' : 'default')};
  white-space: nowrap;
  &:nth-child(even) {
    background-color: #f8fafc;
  }
`;

export default DesktopTable;
