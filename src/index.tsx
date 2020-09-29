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
