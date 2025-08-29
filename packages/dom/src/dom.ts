import type { ILadder, IPole, IBar, IPlayer, IResult } from "@ladder/common";
const DEFAULT_CLASSNAMES = {
  wrap: "ladder",
  canvas: "ladder__canvas",
  "input-wrap--player": "ladder__input-wrap--player",
  "input-wrap--result": "ladder__input-wrap--result",

  "start-btn": "start-btn",
};

export class LadderDom implements ILadder {
  public wrapEl: HTMLElement;
  public startBtn: HTMLButtonElement;
  public endBtn: HTMLButtonElement;

  // private inputEls: HTMLInputElement[];
  public poles: IPole[];
  public bars: IBar[];
  public players: IPlayer[];
  public results: IResult[];
  constructor(props: {
    canvasEl: HTMLCanvasElement;
    players?: IPlayer[];
    results?: IResult[];
    classNames?: typeof DEFAULT_CLASSNAMES;
  }) {
    this.poles = [];
    this.bars = [];
    this.players = props.players ?? [];
    this.results = props.results ?? [];
    // this.inputEls = [];

    // props 주입
    const classNames = props.classNames ?? DEFAULT_CLASSNAMES;

    // 엘리먼트 생성

    this.wrapEl = document.createElement("div");
    this.startBtn = document.createElement("button");
    this.endBtn = document.createElement("button");
    const inputWrap = document.createElement("div");
    const inputResultWrap = document.createElement("div");

    // 웨퍼, 캔버스 클래스
    this.wrapEl.classList.add(classNames.wrap);

    // 버튼 클래스 텍스트
    this.startBtn.innerText = "시작";
    this.endBtn.innerText = "끝내기";
    this.startBtn.classList.add(classNames["start-btn"]);
    // this.endBtn.classList.add(classNames["end-btn"]);
    this.startBtn.onclick = this.handleStart.bind(this);
    // this.startBtn.addEventListener("click", this.handleStart.bind(null));
    //인풋 클래스 및 어팬드

    inputWrap.classList.add(classNames["input-wrap--player"]);
    inputResultWrap.classList.add(classNames["input-wrap--result"]);
    this.players.concat(this.results).map((x, i, arr) => {
      const input = document.createElement("input");
      const value = x.value;
      input.dataset.poleId = `${x.poleId}`;
      input.value = value;
      input.oninput = this.handleInput.bind(this);

      if (i / arr.length < 0.5) {
        input.dataset.type = "player";
        inputWrap.append(input);
      } else {
        input.dataset.type = "result";
        inputResultWrap.append(input);
      }
      // this.inputEls.push(input);
      return input;
    });
    // El에 어팬드
    this.wrapEl.append(inputWrap);
    this.wrapEl.append(props.canvasEl);
    this.wrapEl.append(inputResultWrap);

    this.wrapEl.append(this.startBtn);
    // this.wrapEl.append(this.endBtn);
  }

  handleInput(e: Event) {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const type = target.dataset.type;
      if (type === "player") {
        this.players.find((x) => x.poleId === target.dataset.poleId)!.value =
          target.value;
      } else {
        this.results.find((x) => x.poleId === target.dataset.poleId)!.value =
          target.value;
      }
    }
  }
  handleStart() {
    alert(JSON.stringify({ players: this.players, results: this.results }));
  }
}
