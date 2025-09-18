import type { IBar, IPlayer, IPole, IResult } from "../types";

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

export function generateBarData(poles: IPole[], maxBars?: number): IBar[] {
  if (poles.length < 2) {
    throw new Error("poles must have at least 2 elements");
  }

  return Array.from({ length: maxBars || poles.length * 4 }, () => {
    const randomPoleIndex = Math.floor(Math.random() * poles.length);
    const newY = Math.floor(Math.random() * 1000) / 1000;

    return {
      pole1Id: poles[randomPoleIndex]!.id,
      pole2Id: poles[randomPoleIndex + 1]!.id,
      pole1Y: Math.floor(Math.random() * 1000) / 1000,
      pole2Y: Math.floor(Math.random() * 1000) / 1000
    };
  });
}

export function generateBarDataWithDiagonal(poles: IPole[], maxBars?: number): IBar[] {
  if (poles.length < 2) {
    throw new Error("poles must have at least 2 elements");
  }

  return Array.from({ length: maxBars || poles.length * 4 }, () => {
    const randomPoleIndex = Math.floor(Math.random() * poles.length);
    const isDiagonal = Math.random() < 0.5;
    const newY = Math.floor(Math.random() * 1000) / 1000;

    return {
      pole1Id: poles[randomPoleIndex]!.id,
      pole2Id: poles[randomPoleIndex + 1]!.id,
      pole1Y: Math.floor(Math.random() * 1000) / 1000,
      pole2Y: Math.floor(Math.random() * 1000) / 1000
    };
  });
}

export function generateRandomData(playerValues: string[], resultValues: string[], maxBars?: number) {
  const poles = generatePoleData(playerValues.length);
  const players = generatePlayerData(playerValues, poles);
  const results = generateResultData(resultValues, poles);
  const bars = generateBarData(poles, maxBars);

  return {
    poles,
    players,
    results,
    bars
  };
}
