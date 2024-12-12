import styled from 'styled-components';
import { ButtonVariants, device } from '../../styles';
import { buttonsTitles } from '../../utils/texts';
import Icon from './Icons';
import { Button } from '@aplinkosministerija/design-system';

interface ActionContainerInterface {
  onClose: () => void;
  descriptionFirstPart?: string;
  descriptionSecondPart?: string;
  name?: string;
  title?: string;
  onClick: () => void;
  loading?: boolean;
}

const DeleteCard = ({
  onClose,
  name,
  descriptionFirstPart,
  descriptionSecondPart,
  onClick,
  title,
  loading = false,
}: ActionContainerInterface) => {
  return (
    <>
      <Container tabIndex={0}>
        <IconContainer onClick={() => onClose()}>
          <StyledCloseButton name={'close'} />
        </IconContainer>
        <Title>{title}</Title>
        <Description>
          {descriptionFirstPart} <Name>{name}</Name> {descriptionSecondPart}
        </Description>
        <BottomRow>
          <StyledButton
            onClick={() => onClose()}
            variant={ButtonVariants.TRANSPARENT}            
          >
            {buttonsTitles.cancel}
          </StyledButton>
          <StyledButton
            onClick={() => onClick()}
            variant={ButtonVariants.DANGER}
            loading={loading}
            disabled={loading}
          >
            {buttonsTitles.delete}
          </StyledButton>
        </BottomRow>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  width: 430px;
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media ${device.mobileL} {
    padding: 40px 16px 32px 16px;
    width: 100%;
    height: 100%;
    justify-content: center;
    border-radius: 0px;
  }
`;

const StyledCloseButton = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 2rem;
  @media ${device.mobileL} {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const IconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: 9px;
  top: 9px;
  z-index: 5;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
  gap: 16px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2.4rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.error};
  width: 100%;
`;

const Description = styled.span`
  font-size: 1.6rem;
  color: #4b5565;
  width: 100%;
  text-align: center;
  white-space: pre-line;
`;

const Name = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  width: 100%;
  color: #4b5565;
`;

export default DeleteCard;
