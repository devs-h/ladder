import type { IBar, ILadder } from "@ladder/common";

/**
 * @param ladderData: ILadder
 * @param curPole: string
 * @param curY: number
 * @returns { nextPole: string, nextY: number }
 * @description Get the next step of the ladder for the given pole and current Y
 *
 * @step 1. Sort the bars by the Y value to get the minimum Y value for the next step to occur [sortedBars]
 * @step 2. Get the target bars which is filtered by the given pole and current Y (curY < bar.y[0] so that elements will not be considered if curY have passed) [targetBars]
 * @step 3. Get the minimum Y or the first Y of the target bars [nextY]
 * @step 4. If there is no next step, return the current pole and Y, because there is no next step which means curPole and 1 would be the final step (curPole, 1)
 * @step 5. If there is a next step, return the next pole and Y (nextStep.poleIds[1], nextStep.y[1])
 */

export const getNextStep = (
  ladderData: ILadder,
  curPole: string,
  curY: number,
) => {
  const { bars } = ladderData;
  if (bars.length === 0 || !bars) return null;

  const targetBars = bars.filter(
    (bar) =>
      (bar.pole1Id === curPole || bar.pole2Id === curPole) &&
      (bar.pole1Y > curY || bar.pole2Y > curY),
  );

  const barsGoingRight = targetBars
    .filter((bar) => bar.pole1Id === curPole && bar.pole1Y > curY)
    .sort((a, b) => a.pole1Y - b.pole1Y);

  const barsGoingLeft = targetBars
    .filter((bar) => bar.pole2Id === curPole && bar.pole2Y > curY)
    .sort((a, b) => a.pole2Y - b.pole2Y);

  const minGoingLeft = barsGoingLeft.length > 0 ? barsGoingLeft[0]?.pole2Y : 1;
  const minGoingRight =
    barsGoingRight.length > 0 ? barsGoingRight[0]?.pole1Y : 1;

  const nextStep =
    minGoingLeft! < minGoingRight!
      ? {
          nextPole: barsGoingLeft[0]?.pole1Id!,
          nextY: barsGoingLeft[0]?.pole1Y,
        }
      : {
          nextPole: barsGoingRight[0]?.pole2Id!,
          nextY: barsGoingRight[0]?.pole2Y,
        };

  if (!nextStep.nextPole || !nextStep.nextY)
    return { nextPole: curPole, nextY: 1 }; // If there is no next step assume that this is final

  return nextStep;
};

/**
 * @param ladderData: ILadder
 * @param curPole: string
 * @returns { nextPole: string }
 * @description Get the final destination of the ladder for the given pole using getNextStep function
 *
 * @step 1. Get the next step for the given pole and current Y (0)
 * @step 2. If the next step is not the final step (nextY !== 1), get the next step for the given pole and current Y (invoke getNextStep function with the next pole and nextY)
 * @step 3. If the next step is the final step (nextY === 1), return the next pole
 */

export const getFinalDestination = (ladderData: ILadder, curPole: string) => {
  const { bars } = ladderData;
  if (bars.length === 0 || !bars) return null;

  const nextStep = getNextStep(ladderData, curPole, 0);
  let nextStepResult = nextStep;
  while (nextStepResult?.nextY !== 1) {
    nextStepResult = getNextStep(
      ladderData,
      nextStepResult!.nextPole!,
      nextStepResult!.nextY!,
    );
  }

  return nextStepResult!.nextPole;
};
