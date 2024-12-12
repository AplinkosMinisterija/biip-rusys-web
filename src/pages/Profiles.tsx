import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../components/other/Icons';
import LoaderComponent from '../components/other/LoaderComponent';
import ProfileCard from '../components/other/ProfileCard';
import { useAppSelector } from '../state/hooks';
import { useLogoutMutation } from '../utils/hooks';
import { handleSelectProfile } from '../utils/loginFunctions';
import { buttonsTitles, formLabels } from '../utils/texts';
import { ButtonVariants } from '../styles';
import { Button } from '@aplinkosministerija/design-system';

const Profiles = () => {
  const user = useAppSelector((state) => state?.user?.userData);
  const [loading, setLoading] = useState(false);
  const { mutateAsync } = useLogoutMutation();

  const handleSelect = (profileId: string) => {
    setLoading(true);
    handleSelectProfile(profileId);
  };

  if (loading) return <LoaderComponent />;

  return (
    <Container>
      <Title>{formLabels.selectProfile}</Title>
      <InnerContainer>
        {user.profiles?.map((profile) => {
          const email = profile.email || user.email || '-';
          return (
            <ProfileCard
              id={profile?.id}
              name={profile.name}
              email={email}
              onSelect={(id) => handleSelect(id)}
            />
          );
        })}
        <Row>
          <Button
            variant={ButtonVariants.TRANSPARENT}
            left={<Icon name="exit" />}
            onClick={() => mutateAsync()}
          >
            {buttonsTitles.logout}
          </Button>
        </Row>
      </InnerContainer>
    </Container>
  );
};

export default Profiles;

const Container = styled.div``;

const Row = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

const Title = styled.div`
  font-size: 1.8rem;
  line-height: 22px;
  font-weight: bold;
  color: #121926;
  margin-bottom: 16px;
`;
