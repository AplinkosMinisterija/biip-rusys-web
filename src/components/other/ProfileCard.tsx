import { useState } from 'react';
import styled from 'styled-components';
import Icon from './Icons';

interface ProfileCardProps {
  name: string;
  email: string;
  id: string;
  onSelect: (id: string) => void;
}

const ProfileCard = ({ id, name, email, onSelect }: ProfileCardProps) => {
  const [showArrow, setShowArrow] = useState(false);
  return (
    <Container
      key={id}
      tabIndex={0}
      aria-label={`Select profile ${name || email}`}
      role="button"
      onClick={() => onSelect(id)}
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}
      onFocus={() => setShowArrow(true)}
      onBlur={() => setShowArrow(false)}
    >
      <Name>{name}</Name>
      <Email>{email}</Email>
      {showArrow && <StyledIcon name="arrowRight" />}
    </Container>
  );
};

const Container = styled.button`
  background-color: white;
  border: 1px solid #cdd5df8f;
  border-radius: 4px;
  width: 100%;
  height: 64px;
  padding: 12px 17px;
  position: relative;
  text-align: left;
  left: 0;
  :focus,
  :hover {
    background-color: #febc1d14;
    box-shadow: 0px 4px 8px ${({ theme }) => `${theme.colors.primary}33`};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

const Name = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: #121926;
`;

const Email = styled.div`
  font-size: 1.4rem;
  color: #4b5565;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  top: 20px;
  right: 16px;
`;

export default ProfileCard;
