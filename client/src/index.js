/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
import '@elastic/eui/dist/eui_theme_light.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EuiProvider } from '@elastic/eui';
import App from './App.js';

/**
 * import '@elastic/eui/dist/eui_theme_light.css';
import ReactDOM from 'react-dom';
import React from 'react';
import createCache from '@emotion/cache';
import { EuiProvider } from '@elastic/eui';
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EuiProvider>
      <App />
    </EuiProvider>
  </React.StrictMode>,
);
