import type { ILadder } from "@ladder/common";
import { LadderCanvas } from "@ladder/canvas";

/**
 * LadderKit: 렌더러 독립적인 캔버스/상태 제어 유틸리티
 * - 어떤 프레임워크에서도 동일하게 사용
 * - DOM 엘리먼트만 주입받아 캔버스 부착
 */
export interface LadderKitOptions {
  width?: number;
  height?: number;
  padding?: number;
  color?: string;
  font?: string;
  fontColor?: string;
}

export interface LadderKit {
  /** 캔버스 루트 노드에 canvas 엘리먼트를 append */
  mountCanvas(container: HTMLElement): void;
  /** 데이터로 그리기 */
  draw(data: ILadder, opts?: LadderKitOptions): void;
  /** 리소스 해제 */
  destroy(): void;
  /** 내부 캔버스 노출(필요 시) */
  getCanvasEl(): HTMLCanvasElement;
}

/**
 * @param data 초기 데이터(Optional). draw 시점에 전달해도 됨.
 */
export function createLadderKit(data?: ILadder): LadderKit {
  const canvas = new LadderCanvas();

  const mountCanvas = (container: HTMLElement) => {
    if (!container) return;
    if (!canvas.canvasEl.isConnected) container.appendChild(canvas.canvasEl);
  };

  const draw = (d: ILadder, opts?: LadderKitOptions) => {
    canvas.drawFromData(d, {
      width: opts?.width ?? 1000,
      height: opts?.height ?? 500,
      padding: opts?.padding ?? 40,
      color: opts?.color ?? "#333",
      font: opts?.font ?? "14px sans-serif",
      fontColor: opts?.fontColor ?? "#000",
    });
  };

  const destroy = () => {
    const el = canvas.canvasEl;
    if (el && el.parentElement) el.parentElement.removeChild(el);
    // 필요 시 추가 정리
  };

  const getCanvasEl = () => canvas.canvasEl;

  // 초기 데이터가 있으면 늦게 draw 호출해도 됨
  return { mountCanvas, draw, destroy, getCanvasEl };
}
