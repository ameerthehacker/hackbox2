import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${(props) => props.theme.colors['sideBar.background']};
  color: ${(props) => props.theme.colors['sideBar.foreground']};
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

const SidebarItem = styled.div<SidebarItemProps>`
  font-size: 2em !important;
  padding: 15px 0;
  width: 100%;
  opacity: ${props => props.isSelected? 1: 0.6};
  cursor: pointer;
  &:hover {
    opacity: 1
  }
  border-left: ${props => props.isSelected? 
  `2px solid ${props.theme.colors['sideBar.foreground']}`: 
  `2px solid ${props.theme.colors['sideBar.background']}`};
`;

type SidebarProps = {
  onSidebarItemClicked: (itemName: string | null) => void;
}

export default function Sidebar({ onSidebarItemClicked }: SidebarProps) {
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
        <SidebarItem 
          isSelected={selectedItem === 'files'} 
          className="codicon codicon-files" 
          onClick={onClicked(onSidebarItemClicked, 'files')} 
        />
        <SidebarItem 
          isSelected={selectedItem === 'search'} 
          onClick={onClicked(onSidebarItemClicked, 'search')} 
          className="codicon codicon-search" 
        />
      </div>
      <div>
        <SidebarItem className="codicon codicon-gear" />
      </div>
    </Container>
  )
}
