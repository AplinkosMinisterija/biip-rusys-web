import styled from 'styled-components';
import ReturnToLogin from '../components/other/ReturnToLogin';
import { formLabels } from '../utils/texts';

export const CantLogin = () => {
  return (
    <>
      <Notification>
        <H1>{formLabels.notGrantedAccess}</H1>
        <Description>
          Jei jungiatės kaip įmonės vadovas ar atstovas, prašome kreiptis el. paštu{' '}
          <Link href="mailto:sris@vstt.lt">sris@vstt.lt</Link>, kad Jums būtų suteikta prieiga.
        </Description>
      </Notification>
      <ReturnToLogin />
    </>
  );
};

const Description = styled.div`
  font-size: 1.6rem;
  color: #666;
`;

const H1 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const Notification = styled.div`
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  max-width: 400px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;
