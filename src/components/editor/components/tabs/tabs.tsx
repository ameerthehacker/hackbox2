import React, { ReactNode, Children, useState } from 'react';
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
  onClick: () => void;
}

const TabContainer = styled.div<TabProps>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  color: ${props => props.isSelected? props.theme.colors['tab.activeForeground']: props.theme.colors['tab.inactiveForeground']};
  background: ${props => props.isSelected? props.theme.colors['tab.activeBackground']: 'none'};
  border-right: 1px solid ${props => props.theme.colors['tab.border']};
  border-bottom: 1px solid ${props => props.isSelected? props.theme.colors['tab.activeBorder']: 'none'};
  cursor: pointer;
`;

const CloseButton = styled.div`
  margin-left: 10px;
`;

const Tab = ({ isSelected, children, onClick }: TabProps) => {
  return (
    <TabContainer isSelected={isSelected} onClick={onClick}>
      {children}
      <CloseButton className="codicon codicon-close" />
    </TabContainer>
  )
}

type TabsProps = {
  children: ReactNode;
}

export default function Tabs({ children }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Container>
      {
        Children.map(children, (child, index) => (
          <Tab isSelected={selectedIndex === index} key={index} onClick={() => setSelectedIndex(index)}>
            {child}
          </Tab>
        ))
      }
    </Container>
  )
}
