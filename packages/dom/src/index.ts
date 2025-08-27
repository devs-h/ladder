import { LadderCanvas } from "@ladder/canvas";
import { LadderCore } from "@ladder/core";
import type { Ladder } from "@ladder/types";
const DEFAULT_CLASSNAMES = {
  wrap: "ladder",
  canvas: "ladder__canvas",
  "input-wrap": "ladder__input-wrap",
  "input-wrap--result": "ladder__input-wrap--result",

  "start-btn": "start-btn",
};
export class LadderDom implements Ladder {
  public wrapEl: HTMLElement;
  public inputs: string[];
  public startBtn: HTMLButtonElement;
  public endBtn: HTMLButtonElement;

  private core: LadderCore = new LadderCore();
  private canvas: LadderCanvas = new LadderCanvas();
  // private inputEls: HTMLInputElement[];
  private length: number;

  public verticalLines: Ladder["verticalLines"];
  public horizontalLines: Ladder["horizontalLines"];
  public players: Ladder["players"];
  public results: Ladder["results"];
  constructor(props: {
    className?: typeof DEFAULT_CLASSNAMES;
    inputs?: string[];
  }) {
    this.verticalLines = [];
    this.horizontalLines = [];
    this.players = [];
    this.results = [];
    // this.inputEls = [];

    // props 주입
    const className = props.className ?? DEFAULT_CLASSNAMES;
    const inputs = props.inputs;
    this.length = inputs?.length ?? 6;

    if (this.length % 2)
      throw new Error(
        "인풋은 짝수개여야 합니다. 인풋 아웃풋의 갯수는 같아야 합니다."
      );

    // 엘리먼트 생성

    this.wrapEl = document.createElement("div");
    this.startBtn = document.createElement("button");
    this.endBtn = document.createElement("button");
    const inputWrap = document.createElement("div");
    const inputResultWrap = document.createElement("div");

    // 웨퍼, 캔버스 클래스
    this.wrapEl.classList.add(className.wrap);
    this.canvas.canvasEl.classList.add(className.canvas);

    // 버튼 클래스 텍스트
    this.startBtn.innerText = "시작";
    this.endBtn.innerText = "끝내기";
    this.startBtn.classList.add(className["start-btn"]);
    // this.endBtn.classList.add(className["end-btn"]);
    this.startBtn.onclick = this.handleStart.bind(this);
    // this.startBtn.addEventListener("click", this.handleStart.bind(null));
    //인풋 클래스 및 어팬드

    this.inputs = Array(this.length).fill(null);
    inputWrap.classList.add(className["input-wrap"]);
    inputResultWrap.classList.add(className["input-wrap--result"]);
    this.inputs.forEach((_, i) => {
      const input = document.createElement("input");
      const value = inputs?.[i] ?? "";
      input.dataset.index = `${i}`;
      input.value = value;
      input.oninput = this.handleInput.bind(this);

      if (i / this.length < 0.5) {
        inputWrap.append(input);
      } else {
        inputResultWrap.append(input);
      }
      this.inputs[i] = value;
      // this.inputEls.push(input);
      return value;
    });
    // 웹El에 어팬드
    this.wrapEl.append(inputWrap);
    this.wrapEl.append(this.canvas.canvasEl);
    this.wrapEl.append(inputResultWrap);

    this.wrapEl.append(this.startBtn);
    // this.wrapEl.append(this.endBtn);
  }
  handleInput(e: Event) {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const index = target.dataset.index;
      this.inputs[Number(index)] = target.value;
    }
  }
  handleStart() {
    this.canvas.draw();
  }
}
