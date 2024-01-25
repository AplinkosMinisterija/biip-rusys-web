import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { validationTexts } from '../../utils/texts';

export const FormErrorMessage = ({ errors }: { errors: any }) => {
  if (isEmpty(errors)) return <></>;

  return (
    <MessageCointainer>
      <ErrorMessage>{validationTexts.formFillError}</ErrorMessage>
    </MessageCointainer>
  );
};

const MessageCointainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 8px;
  gap: 12px;
`;

const ErrorMessage = styled.div`
  display: flex;
  width: 100%;
  background-color: #ffedf0;
  color: #fe1d42;
  border: 1px solid #fe1d42;
  border-radius: 4px;
  padding: 5px 15px 5px 15px;
  margin: 0 0 10px 0;
`;
