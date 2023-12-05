import styled from 'styled-components';
import { ChildrenType } from '../../types';

export interface LoginLayoutProps {
  children?: ChildrenType;
  title?: string;
  className?: string;
  margin?: string;
}

const SimpleContainer = ({ margin, title, children, className }: LoginLayoutProps) => {
  return (
    <Container margin={margin || '0'} className={className}>
      <Title>{title}</Title>
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

const Title = styled.div`
  font-size: 1.4rem;
  margin-bottom: 16px;
  font-weight: bold;
  color: #231f20;
`;

export default SimpleContainer;
