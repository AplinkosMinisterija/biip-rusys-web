import styled from 'styled-components';
import { device } from '../../styles';
import Icon from './Icons';
import Modal from './Modal';

const Popup = ({ children, onClose, visible = true }: any) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <InnerWrapper>
        <IconContainer onClick={onClose}>
          <StyledIcon name="close" />
        </IconContainer>
        <div>{children}</div>
      </InnerWrapper>
    </Modal>
  );
};

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2rem;
`;

const InnerWrapper = styled.div`
  background-color: white;
  border: 1px #dfdfdf solid;
  border-radius: 4px;
  margin: auto;
  /* max-width: 50%; */
  height: fit-content;
  width: fit-content;
  margin: 100px auto;
  @media ${device.mobileL} {
    width: 90%;
    margin: auto;
    max-width: 90%;
  }
`;

const IconContainer = styled.div`
  margin: 0 0 0 auto;
  padding: 24px;
  width: fit-content;
`;

export default Popup;
