import { ReactNode } from 'react';
import styled from 'styled-components';

// The design system only puts a line under text and number inputs, so selects, the date and the
// description get theirs here; a filled-in form shown read-only needs no instructions.
export const FieldHint = ({
  hint,
  show = true,
  children,
}: {
  hint: string;
  show?: boolean;
  children: ReactNode;
}) => (
  <div>
    {children}
    {show && <Hint>{hint}</Hint>}
  </div>
);

const Hint = styled.p`
  margin: 6px 0 0;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: #697586;
`;
