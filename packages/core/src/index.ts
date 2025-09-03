import type { ILadder } from "@ladder/common";

export const getNextStep = (
  ladderData: ILadder,
  curPole: string,
  curY: number,
) => {
  const { bars } = ladderData;
  if (bars.length === 0 || !bars) return null;

  const sortedBars = bars.sort((a, b) => {
    const aY = a.y[0];
    const bY = b.y[0];
    if (aY === undefined || bY === undefined) return 0;
    return aY - bY;
  });

  const targetBars = sortedBars.filter(
    (bar) => bar.poleIds[0] === curPole && curY < bar.y[0]!,
  );

  const nextStep = targetBars.find((bar) => bar.y[0]! > curY);

  if (!nextStep) return { nextPole: curPole, nextY: 1 }; // If there is no next step assume that this is final

  return { nextPole: nextStep.poleIds[1], nextY: nextStep.y[1] };
};

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
