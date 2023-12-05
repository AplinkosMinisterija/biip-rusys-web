import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export interface NotFoundProps {
  url?: string;
  urlLabel?: string;
  label: string;
}

const NotFound = ({ label, urlLabel, url }: NotFoundProps) => {
  const navigate = useNavigate();
  return (
    <Container>
      {label}
      {url && <Url onClick={() => navigate(url)}>{urlLabel}</Url>}
    </Container>
  );
};

const Container = styled.div`
  font-size: 1.4rem;
  color: #4b5565;
`;
const Url = styled.span`
  cursor: pointer;
  text-decoration: underline;
  font-size: 1.4rem;
  color: #0862ab;
`;

export default NotFound;
