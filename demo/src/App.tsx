import "./index.css";
import { LadderKit } from "@ladder/kit";
import { useLayoutEffect, useRef } from "react";
const ladderKit = new LadderKit();
export function App() {
  const wrapRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    wrapRef.current?.append(ladderKit.dom.wrapEl);
  }, []);
  return (
    <div className="app">
      <div className="logo-container"></div>
      <div ref={wrapRef}></div>
      <audio src="/bgm.m4a" autoPlay />
    </div>
  );
}

export default App;
// import "./index.css";
// import { LadderReact } from "@ladder/dom";
// import { useLayoutEffect, useRef } from "react";
// export function App() {
//   return (
//     <div className="app">
//       <div className="logo-container"></div>

//       <LadderReact />
//     </div>
//   );
// }

// export default App;
