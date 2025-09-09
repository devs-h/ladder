import { LadderReact } from "@ladder/dom";
import { LadderCanvas } from "@ladder/canvas";
import { useEffect, useRef } from "react";

export function LadderKit() {
  const canvas = new LadderCanvas();
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    canvasRef.current?.append(canvas.canvasEl);
  }, []);
  return (
    <LadderReact
      players={Array(6)
        .fill("")
        .map((x, i) => ({ id: `${i}`, value: x, poleId: `${i}` }))}
      results={Array(6)
        .fill("")
        .map((x, i) => ({ id: `${i}`, value: x, poleId: `${i}` }))}
      onStart={() => canvas.draw({ width: 1000, height: 500, columns: 6 })}
    >
      <div ref={canvasRef} />
    </LadderReact>
  );
}
