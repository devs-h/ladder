export class LadderCanvas {
  public canvasEl: HTMLCanvasElement;

  constructor() {
    // 값을 받아 화면을 그려야함
    this.canvasEl = document.createElement("canvas");
  }

  /**
   * 간단한 사다리(세로선 + 가로발)를 캔버스에 그립니다.
   *
   * @param opts.columns      세로줄 개수(최소 2)
   * @param opts.width        캔버스 CSS 픽셀 폭
   * @param opts.height       캔버스 CSS 픽셀 높이
   * @param opts.padding      가장자리 여백(px)
   * @param opts.rungGap      가로발 간격(px) — 값이 작을수록 촘촘
   * @param opts.lineWidth    선 굵기(px)
   * @param opts.color        선 색상
   * @param opts.seed         난수 시드(같은 시드면 같은 모양)
   */
  public draw(
    opts: {
      columns?: number;
      width?: number;
      height?: number;
      padding?: number;
      rungGap?: number;
      lineWidth?: number;
      color?: string;
      seed?: number;
    } = {}
  ) {
    const {
      columns = 3,
      width = 360,
      height = 480,
      padding = 24,
      rungGap = 36,
      lineWidth = 2,
      color = "#444",
      seed = 12345,
    } = opts;

    if (columns < 2) {
      throw new Error("columns는 2 이상이어야 합니다.");
    }

    // DPR(레티나) 대응
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    this.canvasEl.style.width = `${width}px`;
    this.canvasEl.style.height = `${height}px`;
    this.canvasEl.style.margin = "auto";
    this.canvasEl.width = width * dpr;
    this.canvasEl.height = height * dpr;

    const ctx = this.canvasEl.getContext("2d");
    if (!ctx) throw new Error("2D 컨텍스트를 가져올 수 없습니다.");

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 모든 그리기를 CSS 픽셀 기준으로
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";

    // 그릴 영역(패딩 제외)
    const left = padding;
    const right = width - padding;
    const top = padding;
    const bottom = height - padding;

    // 세로줄 X 좌표 계산
    const xPositions: number[] = [];
    const span = right - left;
    const stepX = columns > 1 ? span / (columns - 1) : 0;
    for (let i = 0; i < columns; i++) {
      xPositions.push(left + stepX * i);
    }

    // 세로선 그리기
    ctx.beginPath();
    for (const x of xPositions) {
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
    }
    ctx.stroke();

    // 간단한 시드 고정 난수 (Mulberry32)
    let t = seed >>> 0;
    const rand = () => {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };

    // 가로발(랜덤): 일정 간격마다 한 칸 또는 여러 칸에 가로선 배치
    // - 같은 y에서 인접 칸이 겹치지 않도록 간단 방지 로직 포함
    for (let y = top + rungGap; y < bottom - rungGap / 2; y += rungGap) {
      // 이번 y에서 몇 개의 가로발을 넣을지(0~2개 정도)
      const addCount = (rand() < 0.2 ? 0 : 1) + (rand() < 0.25 ? 1 : 0); // 0~2
      const used: Set<number> = new Set(); // 같은 y에서 겹치는 칸 방지

      for (let k = 0; k < addCount; k++) {
        // 왼쪽 인덱스(0..columns-2)
        const leftIdx = Math.floor(rand() * (columns - 1));
        if (
          used.has(leftIdx) ||
          used.has(leftIdx - 1) ||
          used.has(leftIdx + 1)
        ) {
          continue; // 단순 충돌 회피
        }
        used.add(leftIdx);

        const xL = xPositions[leftIdx] ?? 0;
        const xR = xPositions[leftIdx + 1] ?? 0;

        ctx.beginPath();
        ctx.moveTo(xL, y);
        ctx.lineTo(xR, y);
        ctx.stroke();
      }
    }
  }

  public render(id: string) {
    const wrap = document.getElementById(id);
    if (!wrap)
      throw new Error(
        `현재 ${id}가 도큐먼트에 존재하지 않습니다. 다시 확인해주세요.`
      );
    wrap.append(this.canvasEl);
  }
}
