import { useKeyAction } from '@aplinkosministerija/design-system';
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
  const handleKeyDown = useKeyAction((tab) => handleNavigate(tab));

  if (tabs.length < 2) return null;

  const handleNavigate = (tab) => {
    navigate({
      ...(tab.route && {
        pathname: tab.route,
      }),
      ...(tab.search && {
        search: tab.search,
      }),
    });
  };

  return (
    <Container role="tablist" aria-label="Navigation Tabs">
      {map(tabs, (tab) => {
        const isSelected = tab.value === activeTabValue;
        return (
          <TabButton
            key={tab.value}
            role="tab"
            tabIndex={0}
            aria-selected={isSelected}
            isActive={isSelected}
            onClick={() => handleNavigate(tab)}
            onKeyDown={handleKeyDown(tab)}
          >
            <TabLabel>{tab.label}</TabLabel>
          </TabButton>
        );
      })}
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
  padding: 8px 0;
`;

const TabLabel = styled.span`
  color: #121926;
  font-size: 1.4rem;
`;

export default TabBar;
