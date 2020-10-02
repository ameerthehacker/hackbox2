import React from 'react';
import styled from 'styled-components';
import EmptyState from '../../components/empty-state/empty-state';
import SideBar from '../../components/sidebar/sidebar';
import ActivityBar from '../../components/activity-bar/activity-bar';
import Statusbar from '../../components/statusbar/statusbar';

const Container = styled.div`
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
        <ActivityBar onSidebarItemClicked={name => console.log(name)} />
        <SideBar />
        <EmptyState />
      </Workspace>
      <Statusbar />
    </Container>
  );
}
