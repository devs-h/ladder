import "./index.css";
import { APITester } from "./APITester";
import { LadderDom } from "@ladder/dom";
import { useLayoutEffect, useRef } from "react";
const ladderDom = new LadderDom();
export function App() {
  const wrapRef = useRef<HTMLDivElement>(null);
  console.log("ladderDom");
  useLayoutEffect(() => {
    wrapRef.current?.append(ladderDom.wrapEl);
  }, []);
  return (
    <div className="app">
      <div className="logo-container"></div>
      <div ref={wrapRef}></div>
      <h1>Bun + React111</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <APITester />
    </div>
  );
}

export default App;
