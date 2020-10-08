import React, { Children, ReactNode, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

type OpenFileProps = {
  children: ReactNode;
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
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function OpenFiles({ children }: OpenFileProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Container>
      {Children.map(children, (child, index) => (
        <OpenFile isSelected={selectedIndex === index} key={index}>
          <OpenFileContainer>
            <div className="codicon codicon-close" style={{ visibility: selectedIndex === index? 'visible': 'hidden' }} />
            <div style={{ marginLeft: "5px" }}>
              {child}
            </div>
          </OpenFileContainer>
        </OpenFile>
      ))}
    </Container>
  );
}
