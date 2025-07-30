import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../other/Icons';

export interface TableItemProps {
  label: string;
  bottomLabel?: string;
  url?: string;
}

const TableItem = ({ label, url, bottomLabel }: TableItemProps) => {
  const navigate = useNavigate();

  if (!label) {
    return <>-</>;
  }

  return (
    <Container oneColumn={!url}>
      {url && (
        <IconContainer
          onClick={(e) => {
            e.stopPropagation();
            navigate(url);
          }}
        >
          <StyledIcons name={'eye'} />
        </IconContainer>
      )}
      <Label>{label}</Label>
      <IconContainer />
      {bottomLabel && <BottomLabel>{bottomLabel}</BottomLabel>}
    </Container>
  );
};

const Container = styled.div<{ oneColumn: boolean }>`
  display: grid;
  grid-template-columns: ${({ oneColumn }) => (oneColumn ? '1fr' : '20px 1fr')};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-size: 1.3rem;
  color: #121926;
  opacity: 1;
`;

const BottomLabel = styled.div`
  font-size: 1.2rem;
  color: #4b5565;
  opacity: 1;
  line-height: 12px;
`;

const StyledIcons = styled(Icon)`
  font-size: 1.6rem;
  vertical-align: middle;
  &:hover {
    opacity: 50%;
  }
`;
export default TableItem;
