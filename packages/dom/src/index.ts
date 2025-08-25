import { LadderCanvas } from "@ladder/canvas";
const defaultClassNames = {
  wrap: "ladder",
  canvas: "ladder__canvas",
  "input-wrap": "ladder__input-wrap",
  "input-wrap--result": "ladder__input-wrap--result",

  "start-btn": "start-btn",
  // "end-btn": "end-btn",
};
export class LadderDom extends LadderCanvas {
  public wrapEl: HTMLElement;
  public inputs: HTMLInputElement[];
  public startBtn: HTMLButtonElement;
  public endBtn: HTMLButtonElement;
  constructor(props: {
    className?: {
      wrap: string;
      canvas: string;
      "input-wrap": string;
      "input-wrap--result": string;
      "start-btn": "start-btn";
      // "end-btn": "end-btn";
    };
    inputs: string[];
  }) {
    super();
    // props 주입
    const className = props.className ?? defaultClassNames;
    const inputs = props.inputs;
    const LENGTH = inputs.length;

    if (LENGTH % 2)
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
    this.canvasEl.classList.add(className.canvas);

    // 버튼 클래스 텍스트
    this.startBtn.innerText = "시작";
    this.endBtn.innerText = "끝내기";
    this.startBtn.classList.add(className["start-btn"]);
    // this.endBtn.classList.add(className["end-btn"]);
    this.startBtn.onclick = this.draw;
    // this.startBtn.addEventListener("click", this.handleStart.bind(null));
    //인풋 클래스 및 어팬드

    this.inputs = Array(LENGTH).fill(null);
    inputWrap.classList.add(className["input-wrap"]);
    inputResultWrap.classList.add(className["input-wrap--result"]);

    this.inputs.forEach((_, i) => {
      const input = document.createElement("input");
      if (i / LENGTH < 0.5) {
        input.value = inputs[i] ?? "";
        inputWrap.append(input);
      } else {
        input.value = inputs[i] ?? "";
        inputResultWrap.append(input);
      }
    });
    // 웹El에 어팬드
    this.wrapEl.append(inputWrap);
    this.wrapEl.append(this.canvasEl);
    this.wrapEl.append(inputResultWrap);

    this.wrapEl.append(this.startBtn);
    // this.wrapEl.append(this.endBtn);
  }
}
