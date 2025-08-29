/* mock data
const mockLadder = {
  poles: [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ],
  bars: [
    {
      poleIds: [0, 1],
      y: [0.257, 0.312],
    },
    {
      poleIds: [1, 2],
      y: [0.259, 0.864],
    },
    {
      poleIds: [2, 3],
      y: [0.777, 0.351],
    },
  ],
  players: [
    { value: "이찬웅", poleId: 0 },
    { value: "문정재", poleId: 1 },
    { value: "윤유진", poleId: 2 },
    { value: "남창원", poleId: 3 },
  ],
  results: [
    { value: "연차", poleId: 0 },
    { value: "오전반차", poleId: 1 },
    { value: "오후반차", poleId: 2 },
    { value: "정시퇴근", poleId: 3 },
  ],
};
*/

export interface IPole {
  id: string;
}

export interface IBar {
  poleIds: string[];
  y: number[];
}

export interface IPlayer {
  value: string;
  poleId: string;
}

export interface IResult {
  value: string;
  poleId: string;
}

export interface ILadder {
  poles: IPole[];
  bars: IBar[];
  players: IPlayer[];
  results: IResult[];
}
