import { type ILadder } from "@ladder/common";
import { LadderCanvas } from "@ladder/canvas";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const mockLadder: ILadder = {
  poles: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }],
  bars: [
    { pole1Id: "0", pole2Id: "1", pole1Y: 0.152, pole2Y: 0.178 },
    { pole1Id: "1", pole2Id: "2", pole1Y: 0.305, pole2Y: 0.452 },
    { pole1Id: "1", pole2Id: "2", pole1Y: 0.497, pole2Y: 0.551 },
    { pole1Id: "2", pole2Id: "3", pole1Y: 0.604, pole2Y: 0.703 },
    { pole1Id: "1", pole2Id: "2", pole1Y: 0.754, pole2Y: 0.799 },
    { pole1Id: "2", pole2Id: "3", pole1Y: 0.849, pole2Y: 0.903 },
    { pole1Id: "2", pole2Id: "3", pole1Y: 0.952, pole2Y: 0.971 },
  ],
  players: [
    { value: "문찬웅", poleId: "0" },
    { value: "이정재", poleId: "1" },
    { value: "남유진", poleId: "2" },
    { value: "윤창원", poleId: "3" },
  ],
  results: [
    { value: "연차", poleId: "0" },
    { value: "오전반차", poleId: "1" },
    { value: "오후반차", poleId: "2" },
    { value: "정시퇴근", poleId: "3" },
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
      onStart={() => {
        canvas.drawFromData(mockLadder, {
          width: 1000,
          height: 500,
          padding: 40,
          color: "#333",
          font: "14px sans-serif",
          fontColor: "#000",
        });
        console.log("dwadawd");
      }}
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
    {
      children,
      players: initialPlayers,
      results: initialResults,
      className,
      onStart,
      onPause,
    },
    ref
  ) {
    const [players, setPlayers] = useState(initialPlayers);
    const [results, setResults] = useState(initialResults);

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

    const handlePlayerChange = (index: number, value: string) => {
      setPlayers((prevPlayers) =>
        prevPlayers?.map((player, i) =>
          i === index ? { ...player, value } : player
        )
      );
    };

    const handleResultChange = (index: number, value: string) => {
      setResults((prevResults) =>
        prevResults?.map((result, i) =>
          i === index ? { ...result, value } : result
        )
      );
    };

    return (
      <div className={className}>
        <div className="flex">
          {players?.map((player, index) => (
            <input
              className="border"
              type="text"
              key={`player-${index}-${player.poleId}`}
              defaultValue={player.value}
              onChange={({ target }) => handlePlayerChange(index, target.value)}
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
              onChange={({ target }) => handleResultChange(index, target.value)}
            />
          ))}
        </div>
        <button onClick={handleStart}>시작</button>
      </div>
    );
  }
);
