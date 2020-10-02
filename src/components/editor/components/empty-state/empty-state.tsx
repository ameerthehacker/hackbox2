import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from './logo.svg';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors['editor.background']};
`;

export default function EmptyState() {
  return (
    <Container>
      <Logo style={{ height: "100%", width: "100%", maxWidth: "256px" }} />
    </Container>
  )
}
