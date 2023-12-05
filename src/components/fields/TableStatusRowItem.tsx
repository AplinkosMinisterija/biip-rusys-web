import styled from 'styled-components';
import { device } from '../../styles';
import { TagColors } from '../../utils/constants';
import StatusTag from '../other/StatusTag';

export interface TableStatusRowItemProps {
  info: { color?: TagColors; label: string }[];
}

const TableStatusRowItem = ({ info }: TableStatusRowItemProps) => {
  return (
    <Container>
      {info.map((item, index) => {
        if (item.label) {
          return <StatusTag key={`status-tag-${index}`} label={item.label} color={item.color} />;
        }

        return null;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

export default TableStatusRowItem;
