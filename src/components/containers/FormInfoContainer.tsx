import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import Avatar from '../other/Avatar';
import SimpleContainer from './SimpleContainer';

export enum KeyTypes {
  createdAt = 'createdAt',
  state = 'state',
  createdBy = 'createdBy',
  status = 'status',
  completeBy = 'completeBy',
  assigned = 'assigned',
  originPlace = 'originPlace',
  originPlaceStatus = 'originPlaceStatus',
  originPlaceCode = 'originPlaceCode',
}
export const formInfolabels = {
  createdAt: 'sukurta:',
  createdBy: 'Duomenis įvedė:',
  state: 'Būsena:',
  status: 'Statusas:',
  completeBy: 'Užduotį atlikti iki:',
  assigned: 'Priskirta',
  originPlace: 'Radavietė:',
  originPlaceStatus: 'Radavietės būsena:',
  originPlaceCode: 'Radavietės kodas:',
};

export type FormInfoContainerProps = {
  [key in KeyTypes]?: string;
};

const FormInfoContainer = (props: FormInfoContainerProps) => {
  const keys: KeyTypes[] = Object.values(KeyTypes);
  return (
    <SimpleContainer title="Informacija">
      <>
        {keys
          .filter((key) => props[key])
          .map((key: KeyTypes) => {
            const propValue = props[key];
            return (
              <Row key={key}>
                <Label>{formInfolabels[key]}</Label>
                <InnerRow>
                  {key === KeyTypes.assigned && (
                    <StyledAvatar
                      name={props[key]?.split(' ')?.[0] || ''}
                      surname={props[key]?.split(' ')?.[1] || ''}
                      mini={true}
                    />
                  )}
                  <Value>{propValue}</Value>
                </InnerRow>
              </Row>
            );
          })}
      </>
    </SimpleContainer>
  );
};

const StyledAvatar = styled(Avatar)`
  margin-right: 12px;
`;

const Label = styled.div`
  text-align: left;
  width: 145px;
  font-size: 1.6rem;
  color: #716c6b;
  margin-right: 35px;
  @media ${device.mobileL} {
    width: 80px;
  }
`;

const Value = styled.div`
  text-align: right;
  font-size: 1.6rem;
  color: #231f20;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 18px;
`;

const InnerRow = styled.div`
  display: flex;
  align-items: center;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

export default FormInfoContainer;
