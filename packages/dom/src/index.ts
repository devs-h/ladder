import { LadderCanvas } from "@ladder/canvas";
export class LadderDom extends LadderCanvas {
  public wrap: HTMLElement;
  constructor() {
    super();
    //값을 받아 화면을 그려야함
    this.wrap = document.createElement("div");
    this.wrap.append(this.canvasEl);
  }

  public render(id: string) {
    const wrap = document.getElementById(id);
    if (!wrap)
      throw new Error(
        `현재 ${id}가 도큐먼트에 존재하지 않습니다. 다시 확인해주세요.`
      );
    wrap.append(this.wrap);
  }
}
