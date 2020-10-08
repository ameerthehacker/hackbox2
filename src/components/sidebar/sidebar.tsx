import React, { ReactNode, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import FileTree from './components/file-tree/file-tree';
import { Collapse } from 'react-collapse';
import OpenFiles from './components/open-files/open-files';
import { getIconForFile } from 'vscode-material-icon-theme-js';

const Container = styled.div`
  height: 100%;
  width: 300px;
  background: ${props => props.theme.colors['sideBar.background']};
  color: ${(props) => props.theme.colors['sideBar.foreground']};
  user-select: none;
`;

const Header = styled.div`
  height: 20px;
  text-transform: uppercase;
  font-size: 0.78em;
  padding-top: 15px;
  padding-left: 20px;
  color: ${props => props.theme.colors['sideBarSectionHeader.foreground']};
`;

const SectionHeader = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: bold;
  padding: 5px;
  padding-left: 0;
  background: ${props => props.theme.colors['sideBarSectionHeader.background']};
  color: ${props => props.theme.colors['sideBarSectionHeader.foreground']};
  border-bottom: 1px solid ${props => props.theme.colors['contrastBorder']};
  display: flex;
  cursor: pointer;
`;

const SectionContent = styled(Collapse)`
  font-size: 0.9em;
`;

const SectionHeaderText = styled.div`
  margin-left: 5px;
`;

const Sections = styled.div`
  margin-top: 5px;
`;

const CollapseCSS = createGlobalStyle`
  .ReactCollapse--collapse {
    transition: height 150ms;
  }
`;

const OpenFile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

type SectionProps = {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

const Section = ({ title, children, defaultOpen }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <SectionHeader onClick={() => setIsOpen(isOpen => !isOpen)}>
        <div className={`codicon codicon-chevron-${isOpen? 'down': 'right'}`}></div>
        <SectionHeaderText>{title}</SectionHeaderText>
      </SectionHeader>
      <SectionContent isOpened={isOpen || false}>
        {children}
      </SectionContent>
    </div>
  )
}

export default function SideBar() {
  return (
    <>
      <CollapseCSS />
      <Container>
        <Header>
          Explorer
        </Header>
        <Sections>
          <Section title="Open Files" defaultOpen={true}>
            <OpenFiles>
              <OpenFile>
                <img 
                  alt=""
                  style={{ height: "18px" }}
                  src={`https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/${getIconForFile('index.tsx')}`}
                />
                <div style={{ marginLeft: "5px" }}>index.tsx</div>
              </OpenFile>
              <OpenFile>
                <img 
                  alt=""
                  style={{ height: "18px" }}
                  src={`https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/${getIconForFile('index.html')}`}
                />
                <div style={{ marginLeft: "5px" }}>index.html</div>
              </OpenFile>
              <OpenFile>
                <img 
                  alt=""
                  style={{ height: "18px" }}
                  src={`https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/${getIconForFile('index.css')}`}
                />
                <div style={{ marginLeft: "5px" }}>index.css</div>
              </OpenFile>
            </OpenFiles>
          </Section>
          <Section title="Hackbox" defaultOpen={true}>
            <FileTree />
          </Section>
        </Sections>
      </Container>
    </>
  )
}
