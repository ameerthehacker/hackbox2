import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 40px;
  background: ${props => props.theme.colors['editorGroupHeader.tabsBackground']};
  border-bottom: 1px solid ${props => props.theme.colors['tab.border']};
  color: ${props => props.theme.colors['foreground']};
  user-select: none;
  display: flex;
`;

type TabProps = {
  isSelected?: boolean;
  children?: ReactNode;
}

const TabContainer = styled.div<TabProps>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  background: ${props => props.isSelected? props.theme.colors['tab.activeBackground']: 'none'};
  border-right: 1px solid ${props => props.theme.colors['tab.border']};
`;

const CloseButton = styled.div`
  margin-left: 10px;
`;

const Tab = ({ isSelected, children }: TabProps) => {
  return (
    <TabContainer isSelected={isSelected}>
      {children}
      <CloseButton className="codicon codicon-close" />
    </TabContainer>
  )
}

export default function Tabs() {
  return (
    <Container>
      <Tab isSelected={true}>
        index.js
      </Tab>
      <Tab>
        navbar.js
      </Tab>
    </Container>
  )
}
