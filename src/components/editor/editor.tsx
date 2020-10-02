import React, { useCallback } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useTheme } from 'styled-components';

export default function Editor() {
  const theme: any = useTheme();
  const onEditorMounted = useCallback((monacoEditor: typeof monaco) => {
    monacoEditor.editor.defineTheme('shades-of-purple', {
      rules: [],
      base: 'vs',
      inherit: false,
      colors: {
        'editor.background': theme.colors['editor.background']
      }
    });
  }, [theme.colors]);

  return <MonacoEditor
          theme="shades-of-purple"
          width="100%"
          height="100%" 
          value="function hello() {}"
          options={{
            minimap: {
              enabled: false
            },
          }}
          editorWillMount={onEditorMounted}
          language="javascript" 
        />
}
