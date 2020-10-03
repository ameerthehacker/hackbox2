import React from 'react';
import styled from 'styled-components';
import SideBar from '@src/components/sidebar/sidebar';
import ActivityBar from '@src/components/activity-bar/activity-bar';
import Statusbar from '@src/components/statusbar/statusbar';
import Editor from '@src/components/editor/editor';

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
        <Editor />
      </Workspace>
      <Statusbar />
    </Container>
  );
}
