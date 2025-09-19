import type { IBar, IPlayer, IPole, IResult } from "../types";

export interface IRandomDataOptions {
  maxBars?: number;
  offset?: number;
}

const MAX_ITERATIONS_GET_NEW_Y_VALUE = 100;
const DECIMAL_PLACES = 1000;
const DEFAULT_OFFSET = 0.005;

function getNewYValue(existingYValues: number[], offset: number = DEFAULT_OFFSET) {
  let newY: number = 0;
  let existingYValuesPaddedOffset = existingYValues.map(y => ({
    from: y - offset,
    to: y + offset
  }));

  existingYValuesPaddedOffset = [
    { from: 0, to: offset },
    ...existingYValuesPaddedOffset,
    { from: 1 - offset, to: 1 }
  ];

  for (let i = 0; i < MAX_ITERATIONS_GET_NEW_Y_VALUE; i++) {
    newY = Math.floor(Math.random() * DECIMAL_PLACES) / DECIMAL_PLACES;

    if (existingYValuesPaddedOffset.some(pos => newY >= pos.from && newY <= pos.to)) {
      // 반복 횟수를 전부 돌았는데도 적합한 값을 찾지 못했을 경우 그대로 -1을 반환
      newY = -1;
    } else {
      break;
    }
  }

  return newY;
}

/**
 * 6자리 짧은 고유 ID를 생성합니다.
 *
 * @returns {string} 6자리 고유 ID (예: "a1b2c3")
 *
 * @example
 * ```typescript
 * const id = generateUID();
 * ```
 */
export function generateUID() {
  const firstPart = (Math.random() * 46656) | 0;
  const secondPart = (Math.random() * 46656) | 0;
  const firstPartString = ("000" + firstPart.toString(36)).slice(-3);
  const secondPartString = ("000" + secondPart.toString(36)).slice(-3);

  return firstPartString + secondPartString;
}

export function generatePoleData(poleCount: number): IPole[] {
  return Array.from({ length: poleCount }, () => ({
    id: generateUID(),
  }));
}

export function generatePlayerData(playerValues: string[], poles: IPole[]): IPlayer[] {
  if (playerValues.length !== poles.length) {
    throw new Error("players and poles must have the same length");
  }

  return playerValues.map((playerText, index) => ({
    value: playerText,
    poleId: poles[index]!.id
  }));
}

export function generateResultData(resultValues: string[], poles: IPole[]): IResult[] {
  if (resultValues.length !== poles.length) {
    throw new Error("results and poles must have the same length");
  }

  return resultValues.map((resultText, index) => ({
    value: resultText,
    poleId: poles[index]!.id
  }));
}

// TODO: 서로다른 pole사이의 값은 중복 허용되도록 개선
export function generateBarData(poles: IPole[], options: IRandomDataOptions = {}): IBar[] {
  if (poles.length < 2) {
    throw new Error("poles must have at least 2 elements");
  }

  const barsCount = options.maxBars || poles.length * 4;
  const bars: IBar[] = [];

  for (let i = 0; i < barsCount; i++) {
    const randomPoleIndex = Math.floor(Math.random() * (poles.length - 1));
    const newY = getNewYValue(bars.map(bar => bar.pole1Y), options.offset);

    if (newY !== -1) {
      bars.push({
        pole1Id: poles[randomPoleIndex]!.id,
        pole2Id: poles[randomPoleIndex + 1]!.id,
        pole1Y: newY,
        pole2Y: newY
      });
    }
  };

  if (bars.length !== barsCount) {
    console.warn(`지정한 바의 개수(${barsCount})만큼 생성되지 않았습니다. 현재 생성된 바의 개수는 ${bars.length}입니다. maxBars, offset 옵션을 적절히 조절해보세요.`);
  }

  return bars;
}

// TODO: Implement this function
export function generateBarDataWithDiagonal(poles: IPole[], options: IRandomDataOptions = {}): IBar[] {
  if (poles.length < 2) {
    throw new Error("poles must have at least 2 elements");
  }

  const bars: IBar[] = [];

  return bars;
}

export function generateRandomData(playerValues: string[], resultValues: string[], options: IRandomDataOptions = {}) {
  const poles = generatePoleData(playerValues.length);
  const players = generatePlayerData(playerValues, poles);
  const results = generateResultData(resultValues, poles);
  const bars = generateBarData(poles, options);

  return {
    poles,
    players,
    results,
    bars
  };
}
