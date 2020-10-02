import React, { useCallback } from 'react';
import Tree, { DefaultNodeProps, treeHandlers, useTreeState } from 'react-hyper-tree';
import styled from 'styled-components';
import { ReactComponent as FolderCloseIcon } from './folder-close.svg';
import { ReactComponent as FolderOpenIcon } from './folder-open.svg';
import { ReactComponent as JavaScriptIcon } from './javascript.svg';

const files = {
  id: 1,
  name: 'src',
  isDir: true,
  children: [
    {
      id: 2,
      name: 'components',
      isDir: true,
      children: [
        {
          id: 8,
          name: 'navbar',
          isDir: true,
          children: [
            {
              id: 9,
              name: 'navbar.js'
            }
          ]
        },
        {
          id: 5,
          name: 'app.js',
        },
        {
          id: 6,
          name: 'auth.js',
        },
        {
          id: 7,
          name: 'index.js',
        },
      ],
    },
  ],
};

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


export default function FileTree() {
  const { required, handlers } = useTreeState({
    data: files,
    id: 'files',
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
              {!node.isOpened() && <FolderCloseIcon />}
              {node.isOpened() && <FolderOpenIcon />}
            </IconContainer>
          </>
        )}
        {!node.data.isDir && (
          <IconContainer isFile={true}>
            <JavaScriptIcon style={{ height: "18px" }} />
          </IconContainer>
        )} 
        <NameContainer>{node.data.name}</NameContainer>
      </NodeContainer>
    );
  }, []);

  return (
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
  )
}
