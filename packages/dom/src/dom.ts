import { LadderCanvas } from "@ladder/canvas";
import { LadderCore } from "@ladder/core";
import type { ILadder, IPole, IBar, IPlayer, IResult } from "@ladder/common";
const DEFAULT_CLASSNAMES = {
  wrap: "ladder",
  canvas: "ladder__canvas",
  "input-wrap": "ladder__input-wrap",
  "input-wrap--result": "ladder__input-wrap--result",

  "start-btn": "start-btn",
};

export class LadderDom implements ILadder {
  public wrapEl: HTMLElement;
  public inputs: (string | number)[];
  public startBtn: HTMLButtonElement;
  public endBtn: HTMLButtonElement;

  // private inputEls: HTMLInputElement[];
  private length: number;

  public poles: IPole[];
  public bars: IBar[];
  public players: IPlayer[];
  public results: IResult[];
  private core: LadderCore = new LadderCore(); //파라메터로 넘기면 될거같음 poles bars players results
  private canvas: LadderCanvas = new LadderCanvas(); //파라메터로 넘기면 될거같음 poles bars players results
  constructor(props: {
    classNames?: typeof DEFAULT_CLASSNAMES;
    inputs?: (string | number)[];
  }) {
    this.poles = [];
    this.bars = [];
    this.players = [];
    this.results = [];
    // this.inputEls = [];

    // props 주입
    const classNames = props.classNames ?? DEFAULT_CLASSNAMES;
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
    this.wrapEl.classList.add(classNames.wrap);
    this.canvas.canvasEl.classList.add(classNames.canvas);

    // 버튼 클래스 텍스트
    this.startBtn.innerText = "시작";
    this.endBtn.innerText = "끝내기";
    this.startBtn.classList.add(classNames["start-btn"]);
    // this.endBtn.classList.add(classNames["end-btn"]);
    this.startBtn.onclick = this.handleStart.bind(this);
    // this.startBtn.addEventListener("click", this.handleStart.bind(null));
    //인풋 클래스 및 어팬드

    this.inputs = Array(this.length).fill(null);
    inputWrap.classList.add(classNames["input-wrap"]);
    inputResultWrap.classList.add(classNames["input-wrap--result"]);
    this.inputs.forEach((_, i) => {
      const input = document.createElement("input");
      const value = `${inputs?.[i]}`;
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
    // El에 어팬드
    this.wrapEl.append(inputWrap);
    this.wrapEl.append(this.canvas.canvasEl);
    this.wrapEl.append(inputResultWrap);

    this.canvas.draw({ columns: this.length });
    this.wrapEl.append(this.startBtn);
    // this.wrapEl.append(this.endBtn);
  }
  handleInputEl(index: number) {
    this.inputs = this.inputs.filter((_, i) => i !== index);
  }
  handleInput(e: Event) {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const index = target.dataset.index;
      this.inputs[Number(index)] = target.value;
    }
  }
  handleStart() {
    alert(JSON.stringify(this.inputs));
  }
}
