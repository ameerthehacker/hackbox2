import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${(props) => props.theme.colors['activityBar.background']};
  color: ${(props) => props.theme.colors['activityBar.foreground']};
  height: 100%;
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

type SidebarItemProps = {
  isSelected?: boolean
}

const ActivityBarItem = styled.div<SidebarItemProps>`
  width: 60px;
  opacity: ${props => props.isSelected? 1: 0.6};
  display: flex;
  justify-content: center;
  &:hover {
    opacity: 1;
  }
  border-left: ${props => props.isSelected? 
  `2px solid ${props.theme.colors['activityBar.foreground']}`: 
  `2px solid ${props.theme.colors['activityBar.background']}`};
  div {
    font-size: 2em !important;
    padding: 15px 0;
    margin-left: -2px;
    cursor: pointer;
  }
`;

type ActivityBarProps = {
  onSidebarItemClicked: (itemName: string | null) => void;
}

export default function ActivityBar({ onSidebarItemClicked }: ActivityBarProps) {
  const onClicked = (fn: (name: string | null) => void, name: string) => () => {
    setSelectedItem(name);

    if (name === selectedItem) {
      setSelectedItem(null);
      fn(null);
    } else {
      fn(name);
    }
  };
  const [selectedItem, setSelectedItem] = useState<string|null>('files');

  return (
    <Container>
      <div>
        <ActivityBarItem
          isSelected={selectedItem === 'files'} 
          onClick={onClicked(onSidebarItemClicked, 'files')} 
        >
          <div className="codicon codicon-files" />
        </ActivityBarItem>
        <ActivityBarItem 
          isSelected={selectedItem === 'search'} 
          onClick={onClicked(onSidebarItemClicked, 'search')} 
        >
          <div className="codicon codicon-search" />
        </ActivityBarItem>
      </div>
      <div>
        <ActivityBarItem>
          <div className="codicon codicon-gear" />
        </ActivityBarItem>
      </div>
    </Container>
  )
}
