import styled from 'styled-components';

export const ToggleBtn = styled.button`
  cursor: pointer;
  font-size: 1.4rem;
  border: 1px solid lightgrey;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.darkPrimary};
`;
