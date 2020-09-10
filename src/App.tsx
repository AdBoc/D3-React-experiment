import React from 'react';
import './chart-style.css';
import ReactWay from "./Components/ReactWay";
import D3Way from "./Components/D3Way";

function App() {
  return (
    <div className="charts">
      <ReactWay/>
      <D3Way/>
    </div>
  );
}

export default App;
