import React, { useCallback } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { convertTheme } from 'monaco-vscode-textmate-theme-converter/lib/cjs';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';
import jsGrammar from './javascript.tmLanguage.json';
import cssGrammar from './css.tmLanguage.json';
import { useTheme } from 'styled-components';

export default function Editor() {
  const theme: any = useTheme();

  const onEditorWillMount = useCallback((monacoEditor: typeof monaco) => {
    monacoEditor.editor.defineTheme(theme.id, convertTheme(theme));
  }, [theme]);

  const onEditorDidMount = useCallback((editor: monaco.editor.ICodeEditor) => {
    const registry = new Registry({
      getGrammarDefinition: (scopeName) => {
          switch (scopeName) {
            case 'source.js.jsx': {
              return Promise.resolve({
                format: 'json',
                content: JSON.stringify(jsGrammar)
              });
            }
            case 'source.css': {
              return Promise.resolve({
                format: 'json',
                content: JSON.stringify(cssGrammar)
              });
            }
            default: {
              return Promise.resolve({
                format: 'json',
                content: {}
              });
            }
          }
      }
    });

    const grammars = new Map();
    // all supported themed languages
    grammars.set('javascript', 'source.js.jsx');
    grammars.set('css', 'source.css');

    (editor as any)._themeService.getTheme = () => {
      return (editor as any)._themeService._theme;
    }

    monaco.languages.typescript.getJavaScriptWorker().then(() => {
      wireTmGrammars(monaco, registry, grammars, editor);
    });
  }, []);

  const code = `import React from 'react';
import styled from 'styled-components';
import SideBar from '../../components/sidebar/sidebar';
import ActivityBar from '../../components/activity-bar/activity-bar';
import Statusbar from '../../components/statusbar/statusbar';
import Editor from '../../components/editor/editor';

const Container = styled.div\`
  height: 100vh;
\`;

const Workspace = styled.div\`
  display: flex;
  height: calc(100vh - 26px);
\`;

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
`;

  return <MonacoEditor
          theme={theme.id}
          width="100%"
          height="100%" 
          value={code}
          options={{
            minimap: {
              enabled: false
            },
          }}
          editorWillMount={onEditorWillMount}
          editorDidMount={onEditorDidMount}
          language="javascript" 
        />;
}