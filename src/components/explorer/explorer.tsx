import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import FileTree from './components/file-tree/file-tree';
import { Collapse } from 'react-collapse';
import { findAllByTestId } from '@testing-library/react';

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

export default function Explorer() {
  return (
    <Container>
      <Header>
        Explorer
      </Header>
      <Sections>
        <Section title="Open Files" />
        <Section title="Hackbox">
          <FileTree />
        </Section>
      </Sections>
    </Container>
  )
}
