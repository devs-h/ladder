import { LadderCore } from "@ladder/core";
import { LadderDom } from "@ladder/dom";
import { LadderCanvas } from "@ladder/canvas";
export class LadderKit {
  core: LadderCore = new LadderCore();
  canvas: LadderCanvas = new LadderCanvas();
  dom: LadderDom;
  constructor() {
    this.dom = new LadderDom({
      players: Array(6)
        .fill("")
        .map((x, i) => ({ id: `${i}`, value: x, poleId: `${i}` })),
      results: Array(6)
        .fill("")
        .map((x, i) => ({ id: `${i}`, value: x, poleId: `${i}` })),
      canvasEl: this.canvas.canvasEl,
    });
    this.canvas.draw({ columns: 6, width: 860, height: 400 });
  }
}
