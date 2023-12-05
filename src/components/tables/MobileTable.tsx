import { isEmpty, map } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';
import { Columns } from '../../types';
import { descriptions } from '../../utils/texts';
import Icon from '../other/Icons';
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

const MobileTable = ({
  data,
  columns,
  emptyStateComponent,
  isFilterApplied = false,
  handleRowClick,
}: DesktopTableProps) => {
  const mainLabels = Object.keys(columns).slice(0, 2);
  const restLabels = Object.keys(columns).slice(2);

  const RenderRow = (row: TableRow, index: number) => {
    const [expandAll, setExpandAll] = useState(false);

    return (
      <TR expanded={true} $pointer={true} key={`tr-${index}`} onClick={() => handleRowClick(row)}>
        <RowTD>
          {!isEmpty(restLabels) && (
            <StyledIconContainer
              onClick={(e) => {
                e.stopPropagation();
                setExpandAll(!expandAll);
              }}
            >
              <StyledIcon expanded={expandAll} name={'dropdownArrow'} />
            </StyledIconContainer>
          )}
        </RowTD>
        {mainLabels.map((label: any, i: number) => {
          return <TD key={`tr-td-${i}`}>{row[label] || '-'}</TD>;
        })}
        {expandAll &&
          restLabels.map((column: any, i: number) => {
            const expandedItem = (
              <ExpandedColumnContainer key={`tr-td-${i}`}>
                <ExpandedColumnName>{columns[column].label || ' '}</ExpandedColumnName>
                <ExpandedColumnValue>{row[column] || '-'}</ExpandedColumnValue>
              </ExpandedColumnContainer>
            );

            if (i % 2 === 0) {
              return (
                <>
                  <RowTD />
                  {expandedItem}
                </>
              );
            }
            return expandedItem;
          })}
      </TR>
    );
  };

  const generateTableContent = () => {
    if (!isEmpty(data)) {
      return map(data, (row: TableRow, index: number) => RenderRow(row, index));
    } else if (isFilterApplied) {
      return (
        <TR expanded={false} $pointer={false} $hide_border={true}>
          <TdSecond colSpan={mainLabels.length}>{descriptions.tableNotFound}</TdSecond>
        </TR>
      );
    } else {
      return (
        <TR expanded={false} $pointer={false} $hide_border={true}>
          <TdSecond colSpan={mainLabels.length}>{emptyStateComponent}</TdSecond>
        </TR>
      );
    }
  };

  return (
    <TableContainer>
      <CustomTable>
        <THEAD>
          <TR expanded={true} $pointer={false}>
            <ArrowTh />
            {mainLabels.map((key: any, i: number) => {
              return <TH key={`tr-th-${i}`}>{columns[key].label}</TH>;
            })}
          </TR>
        </THEAD>

        <tbody>{generateTableContent()}</tbody>
      </CustomTable>
    </TableContainer>
  );
};

const ExpandedColumnName = styled.div`
  font-size: 1.2rem;
  color: #697586;
`;

const ExpandedColumnValue = styled.div`
  text-align: left;
  font-size: 1.4rem;
  color: #121926;
`;

const ExpandedColumnContainer = styled.td`
  display: flex;
  flex-direction: column;
  gap: 0px;
  margin-bottom: 6px;
`;

const RowTD = styled.td`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  width: 32px;
`;

const ArrowTh = styled.th`
  padding: 18px 0px;
  text-align: left;
  letter-spacing: 0.29px;
  color: #9aa4b2;
  width: 32px;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TH = styled.th`
  padding: 18px 0px;
  text-align: left;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.29px;
  color: #4b5565;
`;

const TD = styled.td`
  text-align: left;
  font-size: 1.4rem;
  color: #121926;
  padding: 12px 0;
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
  expanded: boolean;
}>`
  width: 100%;
  border: none !important;

  ${({ expanded }) =>
    expanded &&
    `
    display: grid;
    grid-template-columns: 32px 1fr 1fr;
    align-items: center;
  `}

  border-bottom: ${({ $hide_border }) => ($hide_border ? 'none' : '1px solid #cdd5df')} !important;
  cursor: ${({ $pointer }) => ($pointer ? 'pointer' : 'default')};

  &:nth-child(even) {
    background-color: #f8fafc;
  }
`;

const StyledIcon = styled(Icon)<{ expanded: boolean }>`
  color: #cdd5df;
  font-size: 2.4rem;
  transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'rotate(0)')};
`;

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MobileTable;
