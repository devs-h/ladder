export function a() {
  console.log("dawdawdawd");
}
interface LadderParameter {
  inputs?: string[];
  outputs?: string[];
}
type LadderResult = Record<string, string>;
type LadderMap = number[][][];
export class Ladder {
  direct: "가로" | "세로" = "세로";
  parameters?: LadderParameter;
  result?: Record<string, string>;

  makeMap({ inputs, outputs }: LadderParameter): LadderMap {
    return [
      [
        [0, 1],
        [0, 1],
        [0, 1],
      ],
    ];
  }
  drawMap(payload: LadderMap): void {
    // 실제 마크업을 만드는건 어떨지?
  }
  drawLine() {
    //
  }
}
// 1. 사다리 로직
export function ladder() {
  // 사다리 로직은
  // 파라메터는 두 배열을 받는다.예) [1,2,3] [4,5,6]
  //
  // 두 배열을 조합한 값을 리턴한다. {1:4,2:5,3:6} OR [1-4,2-5,3-6]
  // 예) drawLadder 를 실행해 리턴값을 받는다
  // getResult에 값을 넣어 결과값을 확인한다.
  // 리셋으로 drawLadder를 다시 실행한다. etc
  //
}

export function drawLadder() {
  // 가로 세로
  // 갯수 예) [1,2,3] [4,5,6] === 3
  // 분기 갯수 optional 디폴트로 지정
  //
  // 사다리 판을 바둑판으로 보고
  // col => 3  인풋의 배열랭스
  // row => 보통 col과 동일하거나 옵셔널로 추가로 받음 === 3
  // 총 3*3 그리드를 그리고 예) [][][]
  // 대각선은    [[1-9][2-8]][3-2]] [[2-1][1-7][3-1]] [[6-1][4-5][5-1]] // 숫자는 0~9까지
}

export function drawLine() {
  // 입력값을 받는다.
  // 버티컬 라인으로 사다리 길
  // 대각선 라인으로 이리저리 라인 생성 단 겹치면 안됨
  // 대각선 라인의 시작점과 끝점을 각각 숫자로 표기
  // 사다리가 시작되면 바둑판에서 가로 길을 따질때 시작점의 낮은 숫자를 찾아 그림을 그림.
}

export function getResult() {
  // drawLadder에서 리턴한 값을 받는다 예) [][][] [][][] [][][]
  // 숫자를 파악하여 최종 결과값을 리턴한다.
}
