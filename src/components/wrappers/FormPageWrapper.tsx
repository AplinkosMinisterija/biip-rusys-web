import styled from 'styled-components';

const FormPageWrapper = ({ children }: { children: any }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  flex-basis: 1200px;
  margin-bottom: 120px;
  display: flex;
  justify-content: center;
`;

export default FormPageWrapper;
