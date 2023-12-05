import React from 'react';
import styled from 'styled-components';
import Icon from '../other/Icons';

export interface InfoMiniContainerProps {
  label: string;
  value: string;
  icon: string;
}

const InfoMiniContainer = ({ label, value, icon }: InfoMiniContainerProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Row>
        <StyledIcon name={icon} /> <Value>{value}</Value>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-size: 1.4rem;
  color: #231f20;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  margin: 0 6px 0 -2px;
  font-size: 1.5rem;
  vertical-align: middle;
  color: #9aa4b2;
`;

const Value = styled.div`
  font-size: 1.4rem;
  margin-bottom: -2px;
  color: #716c6b;
`;

export default InfoMiniContainer;
