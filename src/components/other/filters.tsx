import React from 'react';
import styled from 'styled-components';
import { TextField } from '@aplinkosministerija/design-system';

export interface LoginLayoutProps {
  filters: any;
  onSetFilters: any;
  labels: any;
}

const Filters = ({ filters, onSetFilters, labels }: LoginLayoutProps) => {
  return (
    <Container>
      {(Object.keys(labels) || []).map((key) => (
        <TextField
          key={key}
          onChange={(e) => {
            onSetFilters({ ...filters, [key]: e });
          }}
          value={filters?.[key] || ''}
          padding="0 12px 0 0"
          label={labels?.[key]}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export default Filters;
