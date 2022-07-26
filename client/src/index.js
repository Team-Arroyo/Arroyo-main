/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.js';
import store from './app/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
