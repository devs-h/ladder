import { LadderReact } from "@ladder/dom";
import { LadderCanvas } from "@ladder/canvas";
import { useEffect, useRef } from "react";

const mockLadder = {
  poles: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }],
  bars: [
    { poleIds: ["0", "1"] as [string, string], y: [0.152, 0.178] as [number, number] },
    { poleIds: ["1", "2"] as [string, string], y: [0.305, 0.452] as [number, number] },
    { poleIds: ["1", "2"] as [string, string], y: [0.497, 0.551] as [number, number] },
    { poleIds: ["2", "3"] as [string, string], y: [0.604, 0.703] as [number, number] },
    { poleIds: ["1", "2"] as [string, string], y: [0.754, 0.799] as [number, number] },
    { poleIds: ["2", "3"] as [string, string], y: [0.849, 0.903] as [number, number] },
    { poleIds: ["2", "3"] as [string, string], y: [0.952, 0.971] as [number, number] },
  ],  
  players: [
    { id: "0", value: "문찬웅", poleId: "0" },
    { id: "1", value: "이정재", poleId: "1" },
    { id: "2", value: "남유진", poleId: "2" },
    { id: "3", value: "윤창원", poleId: "3" },
  ],
  results: [
    { id: "0", value: "연차", poleId: "0" },
    { id: "1", value: "오전반차", poleId: "1" },
    { id: "2", value: "오후반차", poleId: "2" },
    { id: "3", value: "정시퇴근", poleId: "3" },
  ],
};


export function LadderKit() {
  const canvas = new LadderCanvas();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    canvasRef.current?.append(canvas.canvasEl);
  }, []);

  return (
    <LadderReact
      players={mockLadder.players}
      results={mockLadder.results}
      onStart={() =>
        canvas.drawFromData(mockLadder, {
          width: 1000,
          height: 500,
          padding: 40,
          color: "#333",
          font: "14px sans-serif",
          fontColor: "#000",
        })
      }
    >
      <div ref={canvasRef} />
    </LadderReact>
  );
}
