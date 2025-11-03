// LadderReact.tsx
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import type { ILadder } from "@ladder/common";
import { createLadderKit, type LadderKitOptions } from "./kit";

/** React 렌더러가 받는 공통 Props */
export interface LadderRendererProps {
  data: ILadder;
  options?: LadderKitOptions;
  /** 캔버스 위/아래로 넣을 children 지원 */
  children?: React.ReactNode;
}

/** 외부에서 제어하고 싶을 때 쓸 수 있는 핸들 */
export interface LadderRendererHandle {
  redraw(data?: ILadder, options?: LadderKitOptions): void;
  getCanvas(): HTMLCanvasElement | null;
}

export const LadderReact = forwardRef<
  LadderRendererHandle,
  LadderRendererProps
>(({ data, options, children }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef(createLadderKit());

  useEffect(() => {
    if (containerRef.current) {
      coreRef.current.mountCanvas(containerRef.current);
      coreRef.current.draw(data, options);
    }
    return () => coreRef.current.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // data/options 변경 시 다시 그리기
    coreRef.current.draw(data, options);
  }, [data, options]);

  useImperativeHandle(ref, () => ({
    redraw: (d, o) => coreRef.current.draw(d ?? data, o ?? options),
    getCanvas: () => coreRef.current.getCanvasEl(),
  }));

  return (
    <div className="ladder-react">
      <div ref={containerRef} />
      {children}
    </div>
  );
});
