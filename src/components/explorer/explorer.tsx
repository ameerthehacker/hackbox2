import React from 'react';
import styled from 'styled-components';
import FileTree from './components/file-tree/file-tree';

const Container = styled.div`
  height: 100%;
  width: 300px;
  background: ${props => props.theme.colors['sideBar.background']};
  color: ${(props) => props.theme.colors['sideBar.foreground']};
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
  color: ${props => props.theme.colors['sideBarSectionHeader.foreground']};
  border-bottom: 1px solid ${props => props.theme.colors['contrastBorder']};
  display: flex;
`;

const SectionContent = styled.div`
  font-size: 0.9em;
`;

const SectionHeaderText = styled.div`
  margin-left: 5px;
`;

const Sections = styled.div`
  margin-top: 5px;
`;

export default function Explorer() {
  return (
    <Container>
      <Header>
        Explorer
      </Header>
      <Sections>
        <div>
          <SectionHeader>
            <div className="codicon codicon-chevron-right"></div>
            <SectionHeaderText>Open Files</SectionHeaderText>
          </SectionHeader>
        </div>
        <div>
          <SectionHeader>
            <div className="codicon codicon-chevron-right"></div>
            <SectionHeaderText>Hackbox</SectionHeaderText>
          </SectionHeader>
          <SectionContent>
            <FileTree />
          </SectionContent>
        </div>
      </Sections>
    </Container>
  )
}
