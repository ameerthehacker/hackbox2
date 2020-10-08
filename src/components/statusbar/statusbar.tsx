import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.theme.colors['statusBar.background']};
  color: ${props => props.theme.colors['statusBar.foreground']};
  height: 15px;
  width: 100%;
  border-top: 1px solid ${props => props.theme.colors['statusBar.border']};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 0px;
  font-size: 0.8em;
`;

const Content = styled.div`
  padding: 0 15px;
  display: flex;
  > div + div {
    margin-left: 20px;
  }
`;

export default function Statusbar() {
  return (
    <Container>
      <Content>
        <div>JavaScript</div>
        <div className="codicon codicon-bell-dot" />
      </Content>
    </Container>
  );
}
