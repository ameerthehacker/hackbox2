import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import App from './pages/app/app';
import * as serviceWorker from './serviceWorker';
import nightOwl from './themes/night-owl';
import 'vscode-codicons/dist/codicon.css';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Inter, Roboto, sans-serif;
  }

  .selected-node-wrapper {
    background: ${(props: any) => props.theme.colors['list.activeSelectionBackground']};
    color: ${(props: any) => props.theme.colors['list.activeSelectionForeground']};
  }

  :not(.selected-node-wrapper).node-wrapper:hover {
    background: ${(props: any) => props.theme.colors['list.hoverBackground']};
    color: ${(props: any) => props.theme.colors['list.hoverForeground']};
    user-select: none;
  }

  .node-wrapper {
    user-select: none;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={nightOwl}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
