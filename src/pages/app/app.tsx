import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import SideBar from '@src/components/sidebar/sidebar';
import ActivityBar from '@src/components/activity-bar/activity-bar';
import Statusbar from '@src/components/statusbar/statusbar';
import Editor from '@src/components/editor/editor';
import { useStore } from '@src/store';
import { loadWASM } from 'onigasm';
import ColorPicker from '@src/components/color-picker/color-picket';

const Container = styled.div`
  height: 100vh;
`;

const Workspace = styled.div`
  display: flex;
  height: calc(100vh - 26px);
`;

const ColorPickerContainer = styled.div`
  position: absolute;
  bottom: 40px;
  right: 20px;
`;

export default function App() {
  const setOnigasmLoaded = useStore(state => state.setOnigasmLoaded);
  const setOpenFiles = useStore(state => state.setOpenFiles);
  const setSelectedFile = useStore(state => state.setSelectedFile);
  const isColorPickerVisible = useStore(state => state.isColorPickerVisible);
  const theme = useStore(state => state.theme);
  const [selectedSidebarContainer, setSelectedSidebarContainer] = useState('files');

  useEffect(() => {
    setOpenFiles(['theme.json', 'src/index.tsx', 'src/index.css', 'public/index.html', 'package.json']);
    setSelectedFile('theme.json');
    loadWASM('/onigasm.wasm').finally(() => {
      setOnigasmLoaded();
    });
  }, [setOnigasmLoaded, setOpenFiles, setSelectedFile]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Workspace>
          <ActivityBar onSidebarItemClicked={name => name && setSelectedSidebarContainer(name)} />
          <SideBar selectedContainer={selectedSidebarContainer} />
          <Editor />
        </Workspace>
        <Statusbar />
        {isColorPickerVisible && (
          <ColorPickerContainer>
            <ColorPicker />
          </ColorPickerContainer>
        )}
      </Container>
    </ThemeProvider>
  );
}
