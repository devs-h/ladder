export class LadderCanvas {
  protected canvasEl: HTMLCanvasElement;
  constructor() {
    //값을 받아 화면을 그려야함
    this.canvasEl = document.createElement("canvas");
  }

  protected draw() {
    console.log("왜오류?");
    // 라인을 그리는
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
