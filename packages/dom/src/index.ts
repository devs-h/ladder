import { LadderCanvas } from "@ladder/canvas";
export class LadderDom extends LadderCanvas {
  public wrapEl: HTMLElement;
  constructor() {
    super();
    this.wrapEl = document.createElement("div");
    this.wrapEl.append(this.canvasEl);
    console.log(123123);
  }
}
