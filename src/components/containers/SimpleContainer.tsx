import styled from 'styled-components';
import { ChildrenType } from '../../types';

export interface LoginLayoutProps {
  children?: ChildrenType;
  title?: string;
  className?: string;
  margin?: string;
  additionalComponent?: ChildrenType;
}

const SimpleContainer = ({ margin, title, children, className, additionalComponent }: LoginLayoutProps) => {
  return (
    <Container margin={margin || '0'} className={className}>
      <Header>
        <Title>{title}</Title>
        {additionalComponent}
      </Header>
      <div>{children}</div>
    </Container>
  );
};

const Container = styled.div<{ margin: string }>`
  background-color: #ffffff;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 16px;
  margin: ${({ margin }) => margin};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #231f20;
`;

export default SimpleContainer;
