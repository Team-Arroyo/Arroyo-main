/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import SelectionContainer from './components/SelectionContainer.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Select a log: </p>
        <SelectionContainer />
      </header>
    </div>
  );
}

export default App;
