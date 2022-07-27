/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { EuiProvider } from '@elastic/eui';
import createCache from '@emotion/cache';
import ArroyoTheme from './resources/arroyoTheme.js';
import '@elastic/eui/dist/eui_theme_light.css';
import PageContainer from './components/PageContainer.jsx';
import Wrapper from './components/Wrapper.jsx';

function App() {
  const cache = createCache({
    key: 'front',
    container: document.querySelector('meta[name="emotion-styles"]'),
  });
  cache.compat = true;

  return (
    <EuiProvider cache={cache} theme={ArroyoTheme} colorMode="light">
      <PageContainer content={Wrapper()} />
    </EuiProvider>
  );
}

export default App;
