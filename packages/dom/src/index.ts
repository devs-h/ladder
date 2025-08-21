import { LadderCanvas } from "@ladder/canvas";
const defaultClassNames = {
  wrap: "ladder",
  canvas: "ladder__canvas",
  input: "ladder__input",
  "input--result": "ladder__input--result",
};
const LENGTH = 6;
export class LadderDom extends LadderCanvas {
  public wrapEl: HTMLElement;
  public inputs: HTMLInputElement[];
  constructor(props?: {
    className?: {
      wrap: string;
      canvas: string;
      input: string;
      "input--result": string;
    };
  }) {
    super();

    const className = props?.className ?? defaultClassNames;

    this.wrapEl = document.createElement("div");
    this.wrapEl.classList.add(className.wrap);

    this.canvasEl.classList.add(className.canvas);

    this.inputs = Array(LENGTH).fill(null);

    this.inputs.forEach((_, i) => {
      const input = document.createElement("input");
      if (i / LENGTH < 0.5) {
        input.classList.add(className.input);
      } else {
        input.classList.add(className["input--result"]);
      }
      this.wrapEl.append(input);
    });

    this.wrapEl.append(this.canvasEl);
  }
}
