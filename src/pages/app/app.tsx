import React from 'react';
import styled from 'styled-components';
import Explorer from '../../components/explorer/explorer';
import Sidebar from '../../components/sidebar/sidebar';

const Container = styled.div`
  display: flex;
  font-family: Consolas,monaco,monospace;
`;

export default function App() {
  return (
    <Container>
      <Sidebar onSidebarItemClicked={name => console.log(name)} />
      <Explorer />
    </Container>
  );
}
