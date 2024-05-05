// import React, { useRef, useEffect } from "react";
import "./App.css";
import Panels from "./components/panels";
// import Resizable from "./components/resizeable/ResizablePanels";
import ResizePanels from "./components/resizeable/ResizablePanels";

function App() {
  return (
    <div className="wrapper">
      {/* <ResizePanels/> */}
      <Panels/>
      </div>
  )
}

export default App;
