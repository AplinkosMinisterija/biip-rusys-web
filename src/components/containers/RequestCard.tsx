import styled from 'styled-components';
import { useKeyAction } from '../../state/hooks';

export interface RequestCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
}

const RequestCard = ({ title, selected, description, onClick, disabled }: RequestCardProps) => {
  const handleOnKeyDown = useKeyAction(onClick, disabled);

  return (
    <Container
      role="radio"
      aria-checked={selected}
      tabIndex={disabled ? -1 : 0}
      selected={selected}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      onKeyDown={handleOnKeyDown(title)}
    >
      <Row>
        <Circle selected={selected} />
        <Column>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Column>
      </Row>
    </Container>
  );
};

const Container = styled.div<{ selected: boolean; disabled: boolean }>`
  flex: 1;
  background-color: ${({ selected }) => (selected ? '#fffdf6' : 'white')};
  border: 1px solid #febc1d;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 8px;
  padding: 20px;
  border-color: ${({ theme, selected }) => (selected ? theme.colors.primary : theme.colors.border)};
    &:hover {
      opacity: ${({ disabled }) => (disabled ? 0.48 : 0.6)};
  }
`;

const Circle = styled.div<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: transparent;
  border: ${({ theme, selected }) =>
    `${selected ? 4 : 1}px solid${selected ? theme.colors.primary : theme.colors.border}`};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Description = styled.div`
  font-size: 1.4rem;
  color: #121926;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #121926;
`;

export default RequestCard;
