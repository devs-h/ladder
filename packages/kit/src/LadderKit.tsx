import { type ILadder } from "@ladder/common";
import { LadderCanvas } from "@ladder/canvas";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

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

/** 외부로 내보낼 ref 메서드 타입 */
export interface LadderHandle {
  getPlayers: () => ILadder["players"] | undefined;
  getResults: () => ILadder["results"] | undefined;
}
/** 컴포넌트 props */
export interface LadderReactProps extends Partial<ILadder> {
  children?: React.ReactNode;
  /** 클래스명 커스터마이징 */
  className?: string;
  onStart?: () => void;
  onPause?: () => void;
}

export const LadderReact = forwardRef<LadderHandle, LadderReactProps>(
  function LadderReact(
    { children, players, results, className, onStart, onPause },
    ref
  ) {
    const handleStart = () => {};
    const handleStop = () => {
      onPause?.();
      // audioRef.current?.pause();
    };
    // ✅ 외부로 노출할 메서드만 제공 (DOM 상속 X)
    useImperativeHandle(
      ref,
      (): LadderHandle => ({
        getPlayers: () => players,
        getResults: () => results,
      }),
      [players, results]
    );
    useEffect(() => {
      onStart?.();
    }, []);
    return (
      <div className={className}>
        <div className="flex">
          {players?.map((player, index) => (
            <input
              className="border"
              type="text"
              key={`player-${index}-${player.poleId}`}
              defaultValue={player.value}
              onChange={({ target }) => (player.value = target.value)}
            />
          ))}
        </div>
        {children}
        <div>
          {results?.map((result, index) => (
            <input
              className="border"
              type="text"
              key={`result-${index}-${result.poleId}`}
              defaultValue={result.value}
              onChange={({ target }) => (result.value = target.value)}
            />
          ))}
        </div>
        <button onClick={handleStart}>시작</button>
      </div>
    );
  }
);
