import Icon from '@src/components/icon/icon';
import { useStore } from '@src/store';
import { getBasename } from '@src/utils/utils';
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

const FileNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type TabsProps = {
  filePaths?: string[];
}

export default function Tabs({ filePaths = [] }: TabsProps) {
  const setSelecetedFile = useStore(state => state.setSelectedFile);
  const selectedFile = useStore(state => state.selectedFile);

  return (
    <Container>
      {
        filePaths.map((filePath, index) => {
          const filename = getBasename(filePath);

          return (
            <Tab isSelected={filePath === selectedFile} key={index} onClick={() => setSelecetedFile(filePath)}>
              <FileNameContainer>
                <Icon entityName={filename} />
                <div style={{ marginLeft: "5px" }}>
                  {filename}
                </div>
              </FileNameContainer>
            </Tab>
          );
        })
      }
    </Container>
  )
}
