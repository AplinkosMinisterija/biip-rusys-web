import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { descriptions } from '../../utils/texts';

const Footer = () => {
  return (
    <Container>
      <InnerContainer>
        <Column>
          <FooterText>{descriptions.footerTitle}</FooterText>
          <FooterText>{descriptions.footerDescription}</FooterText>
        </Column>
        <FooterText>Svetainės žemėlapis Privatumo politika</FooterText>
      </InnerContainer>
    </Container>
  );
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const Container = styled.div`
  background-color: #19181d;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 40px 20px;
  margin-top: auto;
`;

const InnerContainer = styled.div`
  flex-basis: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  @media ${device.mobileL} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 60px;
  }
  @media ${device.mobileS} {
    padding: 0 16px;
  }
`;

const FooterText = styled.div`
  font-size: 1.4rem;
  cursor: default;
  color: #eeebe5;
  max-width: 431px;
  @media ${device.mobileL} {
    text-align: center;
    padding-bottom: 24px;
  }
`;

export default Footer;
