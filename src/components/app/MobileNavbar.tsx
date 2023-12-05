import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { handleNavigate } from '../../utils/functions';
import { useFilteredRoutes } from '../../utils/hooks';
import { externalRoutes } from '../../utils/routes';
import { pageTitles } from '../../utils/texts';
import Icon from '../other/Icons';
import MobileProfilesDropdown from '../other/MobileProfilesDropdown';
import AppLogo from './AppLogo';

const MobileHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const routes = useFilteredRoutes();

  return (
    <>
      {!showMenu ? (
        <Header>
          <AppLogo />
          <div onClick={() => setShowMenu(true)}>
            <BurgerIcon name="burger" />
          </div>
        </Header>
      ) : (
        <Container>
          <InfoContainer>
            <SecondRow>
              <Title onClick={() => handleNavigate('/', navigate, setShowMenu)}>
                {pageTitles.title}
              </Title>
              <div onClick={() => setShowMenu(false)}>
                <ExitIcon name="close" />
              </div>
            </SecondRow>
            {externalRoutes.map((route, index) => {
              return (
                <Tab
                  isActive={location.pathname.includes(route.slug)}
                  onClick={() => {
                    route.internal ? navigate(route.slug) : window.open(route.slug, '_blank');
                    setShowMenu(false);
                  }}
                  key={`tab-${index}`}
                >
                  {route.label}
                  {route?.icon}
                </Tab>
              );
            })}
            <Hr />
            {(routes || [])
              .filter((route) => route.dropDown)
              .map((route, index) => {
                return (
                  <Tab
                    isActive={location.pathname.includes(route.slug)}
                    onClick={() => handleNavigate(route.slug, navigate, setShowMenu)}
                    key={`tab-${index}`}
                  >
                    {route.label}
                  </Tab>
                );
              })}
          </InfoContainer>
          <MobileProfilesDropdown hideMenu={setShowMenu} />
        </Container>
      )}
    </>
  );
};

const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 115;
  height: 64px;
  width: 100%;
  padding: 18px 19px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #cdd5df;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #19181d;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 18px 24px;
  z-index: 5;
  overflow-y: auto;
`;

const InfoContainer = styled.div``;

const Tab = styled.div<{ isActive: boolean }>`
  padding: 10px 8px;
  margin: 0 -8px;
  color: #121926;
  border-radius: 4px;
  color: #f7f8fa;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ isActive }) => isActive && '#EEEBE561'};
  &:hover {
    background-color: #eeebe561;
  }
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 30px;
  gap: 8px;
`;

const SecondRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 57px;
`;

const Title = styled.div`
  font-size: 2.3rem;
  font-weight: bold;

  color: white;
  margin-right: 11px;
`;

const BurgerIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2rem;
  vertical-align: middle;
  color: #231f20;
`;

const ExitIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2rem;
  vertical-align: middle;
  color: white;
`;

const Hr = styled.div`
  width: 50%;
  margin: 10px 0 10px 0;
  border-bottom: 1px solid #eeebe561;
`;

export default MobileHeader;
