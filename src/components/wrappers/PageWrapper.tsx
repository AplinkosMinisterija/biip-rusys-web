import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles';
import Button, { ButtonColors } from '../buttons/Button';

interface PageWrapperProps {
  children: JSX.Element;
  title: string;
  buttonInfo: ButtonInfo;
  back?: boolean;
}

export interface ButtonInfo {
  url: string;
  loading: boolean;
  label: string;
}

const PageWrapper = ({ children, title, buttonInfo }: PageWrapperProps) => {
  const navigate = useNavigate();
  const { url, label, loading } = buttonInfo;
  return (
    <Container>
      <Row>
        <Title>{title}</Title>
        <Button
          onClick={() => {
            navigate(url);
          }}
          disabled={loading}
          padding="0"
          variant={ButtonColors.PRIMARY}
        >
          {label}
        </Button>
      </Row>
      <>{children}</>
    </Container>
  );
};

const Container = styled.div`
  flex-basis: 1200px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  letter-spacing: 0px;
  color: #121926;
  opacity: 1;

  @media ${device.mobileL} {
    font-size: 2.4rem;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 22px 0px;
  @media ${device.mobileL} {
    flex-wrap: wrap;
    gap: 16px;
  }
`;
export default PageWrapper;
