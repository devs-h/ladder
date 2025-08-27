// import "./index.css";
// import { LadderDom } from "@ladder/dom";
// import { useLayoutEffect, useRef } from "react";
// const ladderDom = new LadderDom({ inputs: ["1", "2", "3", "4", "5", "6"] });
// export function App() {
//   const wrapRef = useRef<HTMLDivElement>(null);
//   useLayoutEffect(() => {
//     wrapRef.current?.append(ladderDom.wrapEl);
//   }, []);
//   return (
//     <div className="app">
//       <div className="logo-container"></div>
//       <div ref={wrapRef}></div>
//     </div>
//   );
// }

// export default App;
import "./index.css";
import { LadderReact } from "@ladder/dom";
import { useLayoutEffect, useRef } from "react";
export function App() {
  return (
    <div className="app">
      <div className="logo-container"></div>

      <LadderReact />
    </div>
  );
}

export default App;
