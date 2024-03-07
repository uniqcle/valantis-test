import { useState } from "react";

import "./App.css";
import Controls from "./components/Controls";
import List from "./components/List";

function App() {
  const [offset, setOffset] = useState(12);

  return (
    <div className="App container">
      <h1>Valantis Test Task</h1>
      <Controls />

      <List offset={offset} />
    </div>
  );
}

export default App;
