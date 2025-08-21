import "./index.css";
import { APITester } from "./APITester";
import { LadderDom } from "@ladder/dom";
import { useLayoutEffect, useRef } from "react";
const ladderDom = new LadderDom();
export function App() {
  const wrapRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    wrapRef.current?.append(ladderDom.wrapEl);
  }, []);
  return (
    <div className="app">
      <div className="logo-container"></div>
      <div ref={wrapRef}></div>
    </div>
  );
}

export default App;
