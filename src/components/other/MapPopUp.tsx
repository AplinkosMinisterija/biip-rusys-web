import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { slugs } from '../../utils/routes';
import { buttonsTitles } from '../../utils/texts';
import Button from '../buttons/Button';
import Icon from './Icons';

interface MapModalProps {
  description: string;
}

export const MapPopUp = ({ description }: MapModalProps) => {
  const [showPopUp, setShowPopUp] = useState(true);
  const navigate = useNavigate();

  if (!showPopUp) return <></>;

  return (
    <InnerContainer>
      <Row>
        <Description>{description}</Description>
        <IconContainer onClick={() => setShowPopUp(false)}>
          <StyledCloseButton name={'close'} />
        </IconContainer>
      </Row>

      <Button onClick={() => navigate(slugs.newRequest)}>{buttonsTitles.fillOutRequest}</Button>
    </InnerContainer>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  position: absolute;
  z-index: 100;
  top: 12px;
  background-color: white;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
`;

const StyledCloseButton = styled(Icon)`
  color: #121926;
  font-size: 2rem;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const Description = styled.div`
  font-size: 1.6rem;
  color: #121926;
`;
