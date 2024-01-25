import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles';
import { buttonsTitles } from '../../utils/texts';
import Button, { ButtonColors } from '../buttons/Button';
import Icon from './Icons';

export const FormTitle = ({
  backUrl,
  back = true,
  title,
}: {
  backUrl?: string;
  title?: string;
  back?: boolean;
}) => {
  const navigate = useNavigate();
  const url: string | number = backUrl || -1;

  return (
    <Row>
      <InnerRow>
        {back && (
          <Button
            onClick={() => navigate(url as string)}
            leftIcon={<StyledBackIcon name="back" />}
            variant={ButtonColors.TRANSPARENT}
            type="button"
            height={32}
            color="black"
          >
            {buttonsTitles.back}
          </Button>
        )}
        <Title>{title}</Title>
      </InnerRow>
    </Row>
  );
};

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  color: #121926;
  opacity: 1;
  @media ${device.mobileL} {
    font-size: 2.4rem;
  }
`;

const StyledBackIcon = styled(Icon)`
  cursor: pointer;

  font-size: 1.1rem;
  align-self: center;
  color: #000000;
`;

const Row = styled.div<{ titleRowWidth?: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 22px 0px;
  flex-wrap: wrap;
  gap: 16px;
  width: '100%';
`;

const InnerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;
