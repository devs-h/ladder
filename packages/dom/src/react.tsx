import { LadderDom } from "packages/dom/src/dom";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
const DEFAULT_CLASSNAMES = {
  wrap: "ladder",
  canvas: "ladder__canvas",
  "input-wrap": "ladder__input-wrap",
  "input-wrap--result": "ladder__input-wrap--result",

  "start-btn": "start-btn",
};
/** 외부로 내보낼 ref 메서드 타입 */
export interface LadderHandle {
  /** 내부 DOM 인스턴스 조회용 (필요하면) */
  getInstance: () => LadderDom | null;
  /** 게임/애니메이션 시작 같은 동작 트리거 */
  start: () => void;
  /** 현재 inputs 읽기 */
  getInputs: () => string[];
  /** 결과/플레이어 정보 등 커스텀 노출 가능 */
}
/** 컴포넌트 props */
export interface LadderReactProps extends HTMLAttributes<HTMLDivElement> {
  /** 입력값(짝수개 필수: 상단 N, 하단 N) */
  inputs?: string[];
  /** 클래스명 커스터마이징 */
  classNames?: typeof DEFAULT_CLASSNAMES;
  /** mount 이후 콜백 (내부 인스턴스 전달) */
  onReady?: (inst: LadderDom) => void;
}

export const LadderReact = forwardRef<LadderHandle, LadderReactProps>(
  (
    {
      inputs = Array(6).fill(""), // 6개 기본 (상단3 + 하단3)
      classNames = DEFAULT_CLASSNAMES,
      onReady,
      ...props
    },
    ref
  ) => {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const instRef = useRef<LadderDom | null>(null);

    // --- 1) 마운트: 한 번만 생성해서 붙임 -----------------------------------
    useLayoutEffect(() => {
      if (!hostRef.current) return;

      // LadderDom 인스턴스 생성
      const inst = new LadderDom({
        className: classNames,
        inputs,
      });

      // 호스트에 부착
      hostRef.current.appendChild(inst.wrapEl);
      instRef.current = inst;

      onReady?.(inst);

      // 언마운트 시 정리
      return () => {
        try {
          inst.wrapEl.remove();
        } finally {
          instRef.current = null;
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 최초 1회

    // --- 3) 외부 ref로 제어할 수 있는 핸들 제공 -------------------------------
    useImperativeHandle(
      ref,
      (): LadderHandle => ({
        getInstance: () => instRef.current,
        start: () => {
          // 기존 handleStart를 그대로 사용
          instRef.current?.handleStart();
        },
        getInputs: () => instRef.current?.inputs ?? [],
      }),
      []
    );

    return <div ref={hostRef} {...props} />;
  }
);
