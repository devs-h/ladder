import "./index.css";
import { LadderKit } from "@ladder/kit";
import { useLayoutEffect, useRef } from "react";
export function App() {
  return (
    <div className="app">
      <div className="logo-container"></div>
      <LadderKit>
        <canvas />
      </LadderKit>
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
