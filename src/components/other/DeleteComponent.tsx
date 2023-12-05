import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { DeleteInfoProps } from '../../types';
import { buttonsTitles } from '../../utils/texts';
import Button, { ButtonColors } from '../buttons/Button';
import DeleteCard from './DeleteCard';
import Icon from './Icons';
import Modal from './Modal';

export const DeleteComponent = ({ deleteInfo }: { deleteInfo?: DeleteInfoProps }) => {
  const [showModal, setShowModal] = useState(false);

  if (!deleteInfo) return <></>;

  const {
    deleteDescriptionFirstPart,
    deleteDescriptionSecondPart,
    deleteName,
    deleteTitle,
    deleteFunction,
  } = deleteInfo;

  if (!deleteFunction) return <></>;

  return (
    <>
      <DeleteButtonContainer>
        <DeleteButton
          onClick={() => setShowModal(true)}
          variant={ButtonColors.TRANSPARENT}
          type="button"
          leftIcon={<StyledIcon name="deleteItem" />}
          height={32}
          buttonPadding="6px 8px"
          color="black"
        >
          {buttonsTitles.delete}
        </DeleteButton>
      </DeleteButtonContainer>
      <Modal onClose={() => setShowModal(false)} visible={showModal}>
        <DeleteCard
          onClose={() => setShowModal(false)}
          title={deleteTitle}
          descriptionFirstPart={deleteDescriptionFirstPart}
          descriptionSecondPart={deleteDescriptionSecondPart}
          name={deleteName}
          onClick={deleteFunction}
        />
      </Modal>
    </>
  );
};

const DeleteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.danger};
  margin-right: 8px;
`;

const DeleteButton = styled(Button)`
  button {
    border-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.danger};
  }
`;
