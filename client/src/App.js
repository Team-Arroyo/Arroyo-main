/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PageContainer from './components/PageContainer.jsx';
import SelectionContainer from './components/SelectionContainer.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PageContainer content={SelectionContainer} />
      </header>
    </div>
  );
}

export default App;
