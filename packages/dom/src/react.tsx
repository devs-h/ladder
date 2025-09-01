import type { ILadder } from "@ladder/common";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type MouseEvent,
  type MouseEventHandler,
} from "react";
import "./output.css";
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
  onStart?: MouseEventHandler;
  onPause?: MouseEventHandler;
}

export const LadderReact = forwardRef<LadderHandle, LadderReactProps>(
  function LadderReact(
    { children, players, results, className, onStart, onPause },
    ref
  ) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const handleStart = (e: MouseEvent) => {
      onStart?.(e);
      audioRef.current?.play();
      console.log(players, results);
    };
    const handleStop = (e: MouseEvent) => {
      onPause?.(e);
      audioRef.current?.pause();
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

    return (
      <div className={className}>
        <div className="flex">
          {players?.map((player, index) => (
            <input
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
