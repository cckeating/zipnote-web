import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import customTheme from './hoc/Theme/customTheme';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/authContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <CssBaseline />
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
