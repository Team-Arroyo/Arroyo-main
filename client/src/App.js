/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
<<<<<<< HEAD
=======
import createCache from '@emotion/cache';
import '@elastic/eui/dist/eui_theme_light.css';
>>>>>>> 1851920e7e5e5f537c6b052522517bbaf16dc8bd
import { EuiProvider } from '@elastic/eui';
import PageContainer from './components/PageContainer.jsx';
import SelectionContainer from './components/SelectionContainer.jsx';

function App() {
  const cache = createCache({
    key: 'front',
    container: document.querySelector('meta[name="emotion-styles"]'),
  });
  cache.compat = true;

  return (
<<<<<<< HEAD
    <div className="App">
      <header className="App-header">
        <EuiProvider colorMode="light">
          <PageContainer content={SelectionContainer} />
        </EuiProvider>
      </header>
    </div>
=======
    <EuiProvider cache={cache} colorMode="light">
      <PageContainer content={SelectionContainer()} />
    </EuiProvider>
>>>>>>> 1851920e7e5e5f537c6b052522517bbaf16dc8bd
  );
}

export default App;
