import type { ILadder } from "@ladder/common";
import { forwardRef } from "react";

/** 외부로 내보낼 ref 메서드 타입 */
export interface LadderHandle extends HTMLDivElement {}
/** 컴포넌트 props */
export interface LadderReactProps extends Partial<ILadder> {
  children?: React.ReactNode;
  /** 클래스명 커스터마이징 */
  className?: string;
}

export const LadderReact = forwardRef<LadderHandle, LadderReactProps>(
  ({ children, players, results, className }, ref) => {
    return (
      <div className={className} ref={ref}>
        <div>
          {players?.map((player, index) => (
            <input
              type="text"
              key={`player-${index}-${player.poleId}`}
              defaultValue={player.value}
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
            />
          ))}
        </div>
      </div>
    );
  }
);
