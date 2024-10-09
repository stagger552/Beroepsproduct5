import React from "react";
import { JSCharting } from "jscharting-react";

export default function App() {
  const config = {
    type: "horizontal column",
    series: [
      {
        points: [
          { x: "A", y: 50 },
          { x: "B", y: 30 },
          { x: "C", y: 50 }
        ]
      }
    ]
  };

  const divStyle = {
    maxWidth: "700px",
    height: "400px",
    margin: "0px auto"
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={divStyle}>
        <JSCharting options={config} />
      </div>
    </div>
  );
}
