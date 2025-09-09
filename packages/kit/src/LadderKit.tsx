import { LadderCanvas } from "@ladder/canvas";
import { useEffect, useRef } from "react";
import { generateRandomData } from "@ladder/utils";

export function LadderKit() {
  const canvas = new LadderCanvas();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    canvasRef.current?.append(canvas.canvasEl);
  }, []);

  console.log(generateRandomData(
    ["이찬웅", "문정재", "윤유진", "남창원"],
    ["연차", "오전반차", "오후반차", "정시퇴근"]
  ));

  return (
    <div ref={canvasRef} />
  );
}
