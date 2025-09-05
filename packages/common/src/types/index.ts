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
      pole1Id: 0,
      pole2Id: 1,
      pole1Y: 0.257,
      pole2Y: 0.312,
    },
    {
      pole1Id: 1,
      pole2Id: 2,
      pole1Y: 0.259,
      pole2Y: 0.864,
    },
    {
      pole1Id: 2,
      pole2Id: 3,
      pole1Y: 0.777,
      pole2Y: 0.351,
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
  pole1Id: string;
  pole2Id: string;
  pole1Y: number;
  pole2Y: number;
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
