import React, { useCallback } from 'react';
import Tree, { DefaultNodeProps, treeHandlers, useTreeState } from 'react-hyper-tree';
import styled, { createGlobalStyle } from 'styled-components';
import { FILES } from './files';
import { getIconForFile, getIconForFolder, getIconForOpenFolder } from 'vscode-material-icon-theme-js';

const NodeContainer = styled.div`
  display: flex;
  padding: 4px;
  padding-left: 16px;
  align-items: flex-baseline;
`;

const NameContainer = styled.div`
  margin-left: 5px;
  cursor: pointer;
`;

const IconContainer = styled.div<{ isFile?: boolean }>`
  margin-left: ${props => props.isFile? "15px": "5px"};
`;

const TreeCSS = createGlobalStyle`
  .selected-node-wrapper {
    background: ${(props: any) => props.theme.colors['list.activeSelectionBackground']};
    color: ${(props: any) => props.theme.colors['list.activeSelectionForeground']};
  }

  :not(.selected-node-wrapper).node-wrapper:hover {
    background: ${(props: any) => props.theme.colors['list.hoverBackground']};
    color: ${(props: any) => props.theme.colors['list.hoverForeground']};
    user-select: none;
  }

  .node-wrapper {
    user-select: none;
  }
`;

export default function FileTree() {
  const { required, handlers } = useTreeState({
    data: FILES,
    id: 'files',
    defaultOpened: true
  });
  
  const renderNode = useCallback(({ node, onToggle }: DefaultNodeProps) => {
    return (
      <NodeContainer onClick={(evt) => {
        onToggle(evt);

        treeHandlers.trees.files.handlers.setSelected(
          node,
          true
        );
      }}>
        {node.data.isDir && (
          <>
            <div className={`codicon codicon-chevron-${node.isOpened()? 'down': 'right'}`}></div>
            <IconContainer>
              {!node.isOpened() && (
                <img style={{ height: "20px" }} alt="" src={`https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/${getIconForFolder(node.data.name)}`} />
              )}
              {node.isOpened() && (
                <img style={{ height: "20px" }} alt="" src={`https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/${getIconForOpenFolder(node.data.name)}`} />
              )}
            </IconContainer>
          </>
        )}
        {!node.data.isDir && (
          <IconContainer isFile={true}>
            <img
              alt=""
              style={{ height: "18px" }}
              src={`https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/${getIconForFile(node.data.name)}`}
            />
          </IconContainer>
        )} 
        <NameContainer>{node.data.name}</NameContainer>
      </NodeContainer>
    );
  }, []);

  return (
    <>
      <TreeCSS />
      <Tree
        {...required}
        {...handlers}
        classes={{
          selectedNodeWrapper: 'selected-node-wrapper',
          nodeWrapper: 'node-wrapper'
        }}
        gapMode="padding"
        disableTransitions={true}
        depthGap={12}
        renderNode={renderNode}
      />
    </>
  )
}
