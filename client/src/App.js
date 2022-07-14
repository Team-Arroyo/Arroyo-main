/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { EuiProvider } from '@elastic/eui';
import PageContainer from './components/PageContainer.jsx';
import SelectionContainer from './components/SelectionContainer.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EuiProvider colorMode="light">
          <PageContainer content={SelectionContainer} />
        </EuiProvider>
      </header>
    </div>
  );
}

export default App;
