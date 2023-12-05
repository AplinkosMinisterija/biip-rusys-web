import React from 'react';
import styled from 'styled-components';

export interface AvatarProps {
  name: string;
  surname: string;
  className?: string;
  active?: boolean;
  mini?: boolean;
  disabled?: boolean;
}

const Avatar = ({
  name = ' ',
  surname = ' ',
  className,
  active,
  mini,
  disabled = false,
}: AvatarProps) => {
  const initials = `${name[0]?.toUpperCase()}${surname ? surname[0]?.toUpperCase() : ''}`;
  return (
    <Container mini={mini} active={active} className={className}>
      <InnerContainer disabled={disabled} mini={mini}>
        {initials}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div<{ active?: boolean; mini?: boolean }>`
  border-radius: 50%;
  background-color: #716c6b;
  height: ${({ mini }) => (mini ? '24px' : '32px')};
  width: ${({ mini }) => (mini ? '24px' : '32px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div<{
  color?: string;
  mini?: boolean;
  disabled: boolean;
}>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: ${({ mini }) => (mini ? '1rem' : '1.4rem')};

  letter-spacing: 0.84px;
  color: #ffffff;
`;

export default Avatar;
