import React from 'react';
import styled from 'styled-components';
import EmptyState from '../../components/empty-state/empty-state';
import Explorer from '../../components/explorer/explorer';
import Sidebar from '../../components/sidebar/sidebar';
import Statusbar from '../../components/statusbar/statusbar';

const Container = styled.div`
  font-family: Consolas,monaco,monospace;
  height: 100vh;
`;

const Workspace = styled.div`
  display: flex;
  height: calc(100vh - 26px);
`;

export default function App() {
  return (
    <Container>
      <Workspace>
        <Sidebar onSidebarItemClicked={name => console.log(name)} />
        <Explorer />
        <EmptyState />
      </Workspace>
      <Statusbar />
    </Container>
  );
}
