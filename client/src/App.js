import React from "react"
import SelectionContainer from "./components/SelectionContainer.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Select a log: </p>
        <SelectionContainer/>
      </header>
    </div>
  );
}

export default App;