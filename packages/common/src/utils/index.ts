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

/**
 * 사다리 게임용 랜덤 데이터를 생성합니다.
 * 플레이어와 결과 텍스트를 받아서 완전한 사다리 구조를 생성합니다.
 *
 * @param {string[]} playerValues - 플레이어 이름 배열
 * @param {string[]} resultValues - 결과 텍스트 배열 (playerValues와 같은 길이여야 함)
 * @param {number} [maxBars] - 생성할 bar의 최대 개수 (선택사항, 기본값: poleCount * 4)
 *
 * @returns {Object} 사다리 게임 데이터 객체
 *
 * @throws {Error} playerValues와 resultValues의 길이가 다를 때
 *
 * @example
 * ```typescript
 * const ladderData = generateRandomData(
 *   ["이찬웅", "문정재", "윤유진", "남창원"],
 *   ["연차", "오전반차", "오후반차", "정시퇴근"],
 *   6 // maxBars (선택사항)
 * );
 * ```
 */
export function generateRandomData(playerValues: string[], resultValues: string[], maxBars?: number) {
  if (playerValues.length !== resultValues.length) {
    throw new Error("players and results must have the same length");
  }

  const poleCount = playerValues.length;
  const barsCount = maxBars || poleCount * 4;

  const poles: IPole[] = Array.from({ length: poleCount }, () => ({
    id: generateUID()
  }));
  const players: IPlayer[] = playerValues.map((playerText, index) => ({
    value: playerText,
    poleId: poles[index]!.id
  }));
  const results: IResult[] = resultValues.map((resultText, index) => ({
    value: resultText,
    poleId: poles[index]!.id
  }));
  const bars: Array<IBar> = [];

  for (let i = 0; i < barsCount; i++) {
    const randomPoleCount = Math.floor(Math.random() * (poleCount - 1));

    bars.push({
      pole1Id: poles[randomPoleCount]!.id,
      pole2Id: poles[randomPoleCount + 1]!.id,
      pole1Y: Math.floor(Math.random() * 1000) / 1000,
      pole2Y: Math.floor(Math.random() * 1000) / 1000
    });
  }

  return {
    poles,
    bars,
    players,
    results
  };
}
