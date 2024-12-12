import { useState } from 'react';
import styled from 'styled-components';
import { ButtonVariants, device } from '../../styles';
import { DeleteInfoProps } from '../../types';
import { buttonsTitles } from '../../utils/texts';
import DeleteCard from './DeleteCard';
import Icon from './Icons';
import { Button, Modal } from '@aplinkosministerija/design-system';

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
        <Button
          onClick={() => setShowModal(true)}
          variant={ButtonVariants.DANGER_OUTLINE}
          left={<StyledIcon name="deleteItem" />}
        >
          {buttonsTitles.delete}
        </Button>
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
  margin-right: 8px;
`;
