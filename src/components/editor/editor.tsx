import React, { useCallback, useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { convertTheme } from 'monaco-vscode-textmate-theme-converter/lib/cjs';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';
import { useTheme } from 'styled-components';
import Tabs from './components/tabs/tabs';
import Breadcrumbs from './components/breadcrumbs/breadcrumbs';
import { useStore } from '@src/store';
import EmptyState from './components/empty-state/empty-state';
import { useDebouncedCallback } from 'use-debounce';

interface WordPosition extends monaco.editor.IWordAtPosition {
  lineNumber: number;
}

export default function Editor() {
  const theme: any = useTheme();
  const isOnigasmLoaded = useStore(state => state.isOnigasmLoaded);
  const selectedFile = useStore(state => state.selectedFile);
  const openFiles = useStore(state => state.openFiles);
  const setCurrentColor = useStore(state => state.setCurrentColor);
  const currentColor = useStore(state => state.currentColor);
  const monacoEditorRef = useRef<MonacoEditor|null>();
  const setTheme = useStore(state => state.setTheme);
  const lastColorPosition = useRef<WordPosition|null>();
  const onEditorWillMount = useCallback((monacoEditor: typeof monaco) => {
    monacoEditor.languages.register({ id: 'css' });
    monacoEditor.languages.register({ id: 'html' });
    monacoEditor.languages.register({ id: 'javascript' });
    monacoEditor.languages.register({ id: 'typescript' });
    monacoEditor.languages.register({ id: 'json' });

    monacoEditor.editor.defineTheme(theme.id, convertTheme(theme));
  }, [theme]);
  const loadEditorModel = (selectedFile: string) => {
    if (monacoEditorRef.current && selectedFile) {
      const editorModel = monaco.editor.getModels().find(model => model.uri.path === `/${selectedFile}`);

      if (editorModel) {
        monacoEditorRef.current.editor?.setModel(editorModel);
      }
    }
  }
  const onChangeDebounced = useDebouncedCallback(
    (value: string) => {
      let validTheme = null;

      try {
        validTheme = JSON.parse(value);
      } catch {}

      if (validTheme) setTheme(validTheme);
    },
    500
  );

  useEffect(() => {
    loadEditorModel(selectedFile);
  }, [selectedFile])

  useEffect(() => {
    if (lastColorPosition.current && currentColor.substring(1) !== lastColorPosition.current.word) {
      monacoEditorRef.current?.editor?.executeEdits(lastColorPosition.current.word, [
        {
          range: {
            startLineNumber: lastColorPosition.current.lineNumber,
            endLineNumber: lastColorPosition.current.lineNumber,
            startColumn: lastColorPosition.current.startColumn,
            endColumn: lastColorPosition.current.endColumn
          },
          text: currentColor.substring(1)
        }
      ])
    }
  }, [currentColor]);

  const onEditorDidMount = useCallback((editor: monaco.editor.ICodeEditor) => {
    editor.onDidChangeCursorPosition((evt) => {
      const wordData = editor.getModel()?.getWordAtPosition(evt.position);

      if (wordData) {
        const isHash = editor.getModel()?.getValueInRange({
          startLineNumber: evt.position.lineNumber,
          endLineNumber: evt.position.lineNumber,
          startColumn: wordData.startColumn - 1,
          endColumn: wordData.startColumn
        }) === '#';

        if (isHash) {
          setCurrentColor(`#${wordData.word}`);
          lastColorPosition.current = {
            ...wordData,
            lineNumber: evt.position.lineNumber
          };
        } else {
          lastColorPosition.current = null;
        }
      }
    });

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
            case 'source.html': {
              const grammar = (await import('@vscode/extensions/html/syntaxes/html.tmLanguage.json')).default;

              return {
                format: 'json',
                content: grammar
              };
            }
            case 'source.json': {
              const grammar = (await import('@vscode/extensions/json/syntaxes/JSON.tmLanguage.json')).default;

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
    grammars.set('html', 'source.html');
    grammars.set('json', 'source.json');

    (editor as any)._themeService.getTheme = () => {
      return (editor as any)._themeService._theme;
    }

    wireTmGrammars(monaco, registry, grammars, editor);
  }, [setCurrentColor]);

  return (
    <div style={{ width: "100%" }}>
      {
        isOnigasmLoaded? (
          <>
            <Tabs filePaths={openFiles} />       
            <Breadcrumbs filePath={selectedFile} />
            <MonacoEditor
              ref={(ref) => {
                monacoEditorRef.current = ref;

                loadEditorModel(selectedFile);
              }}
              theme={theme.id}
              height="calc(100% - 67px)" 
              options={{
                minimap: {
                  enabled: false
                },
                scrollBeyondLastLine: false
              }}
              editorWillMount={onEditorWillMount}
              editorDidMount={onEditorDidMount}
              language="javascript"
              onChange={(value) => {
                onChangeDebounced.callback(value);
              }}
            />
          </>
        ): <EmptyState />
      }
    </div>
  )
}