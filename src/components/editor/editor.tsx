import React, { useCallback } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { convertTheme } from 'monaco-vscode-textmate-theme-converter/lib/cjs';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';
import { useTheme } from 'styled-components';
import Tabs from './components/tabs/tabs';
import Breadcrumbs from './components/breadcrumbs/breadcrumbs';

export default function Editor() {
  const theme: any = useTheme();

  const onEditorWillMount = useCallback((monacoEditor: typeof monaco) => {
    monacoEditor.languages.register({ id: 'css' });
    monacoEditor.languages.register({ id: 'html' });

    monacoEditor.editor.defineTheme(theme.id, convertTheme(theme));
  }, [theme]);

  const onEditorDidMount = useCallback((editor: monaco.editor.ICodeEditor) => {
    const registry = new Registry({
      getGrammarDefinition: async (scopeName) => {
          switch (scopeName) {
            case 'source.js.jsx': {
              const grammar = (await import('@vscode/extensions/javascript/syntaxes/JavaScriptReact.tmLanguage.json')).default;

              return {
                format: 'json',
                content: grammar
              };
            }
            case 'source.css': {
              const grammar = (await import('@vscode/extensions/css/syntaxes/css.tmLanguage.json')).default;

              return {
                format: 'json',
                content: grammar
              };
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

  return (
    <div style={{ width: "100%" }}>
      <Tabs>
        <div>index.js</div>
        <div>index.html</div>
      </Tabs>
      <Breadcrumbs>
        <div>src</div>
        <div>components</div>
        <div>navbar</div>
        <div>navbar.js</div>
      </Breadcrumbs>
      <MonacoEditor
        theme={theme.id}
        width="100%"
        height="calc(100% - 67px)" 
        value={code}
        options={{
          minimap: {
            enabled: false
          },
          scrollBeyondLastLine: false
        }}
        editorWillMount={onEditorWillMount}
        editorDidMount={onEditorDidMount}
        language="javascript"
      />
    </div>
  )
}