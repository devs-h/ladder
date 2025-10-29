import type { ILadder } from "@ladder/common";

export class LadderCanvas {
  public canvasEl: HTMLCanvasElement;

  constructor() {
    this.canvasEl = document.createElement("canvas");
  }

  /**
   * ladder 데이터를 기반으로 사다리를 그립니다.
   */
  public drawFromData(
    ladder: ILadder,
    opts: {
      width?: number;
      height?: number;
      padding?: number;
      lineWidth?: number;
      color?: string;
      font?: string;
      fontColor?: string;
    } = {}
  ) {
    const {
      width = 360,
      height = 480,
      padding = 24,
      lineWidth = 2,
      color = "#444",
      font = "16px sans-serif",
      fontColor = "#000",
    } = opts;

    // DPR 대응
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    this.canvasEl.style.width = `${width}px`;
    this.canvasEl.style.height = `${height}px`;
    this.canvasEl.width = width * dpr;
    this.canvasEl.height = height * dpr;

    const ctx = this.canvasEl.getContext("2d");
    if (!ctx) throw new Error("2D 컨텍스트를 가져올 수 없습니다.");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";

    // 그릴 영역 계산
    const left = padding;
    const right = width - padding;
    const top = padding;
    const bottom = height - padding;

    // X 좌표 계산
    const poleIds = ladder.poles.map((p) => p.id);
    const poleCount = poleIds.length;
    const xPositions: Record<string, number> = {};
    const stepX = (right - left) / (poleCount - 1);

    poleIds.forEach((id, idx) => {
      xPositions[id] = left + idx * stepX;
    });

    // 세로줄 그리기
    ctx.beginPath();
    for (const x of Object.values(xPositions)) {
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
    }
    ctx.stroke();

    // 가로줄 그리기
    for (const bar of ladder.bars) {
      // 가로줄이 연결된 두 세로줄의 ID
      const [fromPole, toPole] = bar.poleIds as [string, string];

      // 가로줄 위치 y 값 (두 점)
      const [y1, y2] = bar.y;

      // 각 세로줄의 x 좌표 가져오기
      const x1 = xPositions[fromPole];
      const x2 = xPositions[toPole];

      // x 좌표가 유효한 경우에만 그리기 진행
      if (x1 !== undefined && x2 !== undefined) {
        if (y1 !== undefined && y2 !== undefined) {
          /**
           * y 위치 계산 방법
           * bar.y는 [number, number]로 두 점의 상대적 y 위치 비율(0~1)로 들어옴.
           * 두 y 좌표의 평균을 구해 그 위치에 가로줄을 그림.
           * 
           * 주의:
           * - 두 y 값이 크게 차이나면 의도치 않은 위치에 가로줄이 그려질 수 있음.
           * - 보통 가로줄은 한 위치에 그려야 하므로, 입력 데이터의 y 값이 같거나 근접해야 함.
           */
          const yAvg = top + (bottom - top) * ((y1 + y2) / 2);

          // 가로줄 그리기
          ctx.beginPath();
          ctx.moveTo(x1, yAvg);
          ctx.lineTo(x2, yAvg);
          ctx.stroke();
        }
      }
    }

    // 텍스트 스타일 설정
    ctx.font = font;
    ctx.fillStyle = fontColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 플레이어 이름 출력 (위)
    for (const player of ladder.players) {
      const x = xPositions[player.poleId];
      if (x !== undefined) {
        ctx.fillText(player.value, x, top - padding / 1.5);
      }
    }

    // 결과 출력 (아래)
    for (const result of ladder.results) {
      const x = xPositions[result.poleId];
      if (x !== undefined) {
        ctx.fillText(result.value, x, bottom + padding / 1.5);
      }
    }
  }

  /**
   * 지정한 요소 ID에 캔버스를 렌더링합니다.
   */
  public render(id: string) {
    const wrap = document.getElementById(id);
    if (!wrap)
      throw new Error(
        `현재 ${id}가 도큐먼트에 존재하지 않습니다. 다시 확인해주세요.`
      );
    wrap.append(this.canvasEl);
  }
}
