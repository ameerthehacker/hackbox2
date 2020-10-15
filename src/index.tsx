import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './pages/app/app';
import * as serviceWorker from './serviceWorker';
import 'vscode-codicons/dist/codicon.css';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { FILES } from './templates/react';
import { getBasename, getLanguageFromExt } from './utils/utils';

// create all monaco models
for (const filePath in FILES) {
  monaco.editor.createModel(
    FILES[filePath],
    getLanguageFromExt(getBasename(filePath)),
    monaco.Uri.from({ path: filePath, scheme: 'file' })
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Inter, Roboto, sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
