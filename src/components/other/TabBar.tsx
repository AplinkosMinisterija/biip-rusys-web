import { map } from 'lodash';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Resources } from '../../utils/constants';

export interface TabBarProps {
  tabs: Tab[];
  activeTabValue?: string;
}

export interface Tab {
  value?: Resources;
  route: string;
  label: string;
  search?: string;
}

const TabBar = ({ tabs, activeTabValue }: TabBarProps) => {
  const navigate = useNavigate();

  if (tabs.length < 2) return <></>;

  return (
    <Container>
      {map(tabs, (tab) => (
        <TabButton
          key={tab.value}
          isActive={tab.value === activeTabValue}
          onClick={() =>
            navigate({
              ...(tab.route && {
                pathname: tab.route,
              }),
              ...(tab.search && {
                search: tab.search,
              }),
            })
          }
        >
          <TabLabel>{tab.label}</TabLabel>
        </TabButton>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  border-bottom: 1px #c4c4c4 solid;
  margin-bottom: 24px;
  white-space: nowrap;
  overflow-x: auto;
`;

const TabButton = styled.div<{ isActive: boolean }>`
  border-bottom: ${({ isActive, theme }) =>
    `2px ${isActive ? theme.colors.primary : 'transparent'} solid`};
  margin-right: 24px;
  cursor: pointer;
`;

const TabLabel = styled.span`
  margin: 8px 0;
  color: #121926;
  font-size: 1.4rem;
`;

export default TabBar;
