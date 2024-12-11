import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { externalRoutes } from '../../utils/routes';
import ProfilesDropdown from '../other/ProfilesDropdown';
import AppLogo from './AppLogo';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Header>
      <InnerContainer>
        <AppLogo />
        <TabContainer>
          {externalRoutes.map((route, index) => (
            <Tab
              key={`menu-${index}`}
              tabIndex={0}
              aria-label={`tab-${route.label}`}
              role="button"
              onClick={() =>
                route.internal ? navigate(route.slug) : window.open(route.slug, '_blank')
              }
            >
              {route.label}
              {!!route?.icon && route?.icon}
            </Tab>
          ))}
        </TabContainer>
        <ProfilesDropdown />
      </InnerContainer>
    </Header>
  );
};

export default Menu;

const Tab = styled.button`
  font-size: 1.6rem;
  color: #121926;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  :focus,
  :hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  margin: 0px 16px;
  flex-wrap: wrap;
`;

const Header = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 65px;
  width: 100%;
  border-bottom: 1px solid #cdd5df;
  padding: 20px;
`;

const InnerContainer = styled.div`
  flex-basis: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
