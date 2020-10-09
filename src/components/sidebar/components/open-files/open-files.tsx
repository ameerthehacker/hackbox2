import Icon from '@src/components/icon/icon';
import { useStore } from '@src/store';
import { getBasename } from '@src/utils/utils';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

type OpenFileProps = {
  filePaths?: string[];
  isSelected?: boolean;
}

const OpenFile = styled.div<OpenFileProps>`
  padding: 5px;
  cursor: pointer;
  :hover {
    background: ${(props: any) => !props.isSelected && props.theme.colors['list.hoverBackground']};
    color: ${(props: any) => !props.isSelected && props.theme.colors['list.hoverForeground']};
  }
  background: ${props => props.isSelected? props.theme.colors['list.activeSelectionBackground']: 'none'};
  color: ${props => props.isSelected? props.theme.colors['list.activeSelectionForeground']: 'inherit'};
`;

type OpenFileContainerProps = {
  isSelected?: boolean;
}

const OpenFileContainer = styled.div<OpenFileContainerProps>`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FileNameContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export default function OpenFiles({ filePaths = [] }: OpenFileProps) {
  const setSelecetedFile = useStore(state => state.setSelectedFile);
  const selectedFile = useStore(state => state.selectedFile);

  return (
    <Container>
      {filePaths.map((filePath, index) => {
        const filename = getBasename(filePath);

        return (
          <OpenFile isSelected={filePath === selectedFile} key={index} onClick={() => setSelecetedFile(filePath)}>
            <OpenFileContainer>
              <div className="codicon codicon-close" style={{ visibility: filePath === selectedFile? 'visible': 'hidden' }} />
              <FileNameContainer>
                <Icon entityName={filename} />
                <div style={{ marginLeft: "5px" }}>{filename}</div>
              </FileNameContainer>
            </OpenFileContainer>
          </OpenFile>
        )
      })}
    </Container>
  );
}
