import styled from 'styled-components';

export const MeasurementUnit = ({ unit }: { unit: string }) => {
  if (!unit) return <></>;

  return <Container>{unit}</Container>;
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #9aa4b2;
  margin-right: 13px;
`;
