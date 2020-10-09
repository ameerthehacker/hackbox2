import React, { useCallback, useEffect } from 'react';
import Tree, { DefaultNodeProps, treeHandlers, useTreeState } from 'react-hyper-tree';
import styled, { createGlobalStyle } from 'styled-components';
import { FILES } from '@src/templates/react';
import { convertFilesToTree, getBasename } from '@src/utils/utils';
import Icon from '@src/components/icon/icon';
import { useStore } from '@src/store';

const NodeContainer = styled.div`
  display: flex;
  padding: 4px;
  padding-left: 20px;
  align-items: flex-baseline;
  user-select: none;
`;

const NameContainer = styled.div`
  margin-left: 5px;
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
  }

  .node-wrapper {
    user-select: none;
    cursor: pointer;
  }
`;

export default function FileTree() {
  const { required, handlers } = useTreeState({
    data: convertFilesToTree(FILES),
    id: '/',
    defaultOpened: true
  });
  const setSelectedFile = useStore(state => state.setSelectedFile);
  const selectedFile = useStore(state => state.selectedFile);
  const tree = treeHandlers.trees['/'];

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const node = tree.instance.getNodeById(selectedFile);

    if (node) {
      tree.handlers.setSelected(node, true);

      // open all parents of the node
      let parent = node.getParent();

      while(parent) {
        parent.setOpened(true);

        parent = parent.getParent();
      }
    }
  }, [selectedFile])
  
  const renderNode = useCallback(({ node, onToggle }: DefaultNodeProps) => {
    const entityName = getBasename(node.data.path);

    return (
      <NodeContainer onClick={(evt) => {
        onToggle(evt);

        tree.handlers.setSelected(
          node,
          true
        );
        
        if (!node.data.isDir) {
          setSelectedFile(node.data.path);
        }
      }}>
        {node.data.isDir && (
          <>
            <div className={`codicon codicon-chevron-${node.isOpened()? 'down': 'right'}`}></div>
            <IconContainer>
              <Icon entityName={entityName} isDir={true} isDirOpen={node.isOpened()} />
            </IconContainer>
          </>
        )}
        {!node.data.isDir && (
          <IconContainer isFile={true}>
            <Icon entityName={entityName} />
          </IconContainer>
        )} 
        <NameContainer>{entityName}</NameContainer>
      </NodeContainer>
    );
  }, [setSelectedFile]);

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
