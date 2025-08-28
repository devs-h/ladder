export const mockLadder = {
  poles: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
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
    { value: "이찬웅", id: 0 },
    { value: "문정재", id: 1 },
    { value: "윤유진", id: 2 },
    { value: "남창원", id: 3 },
  ],
  results: [
    { value: "연차", id: 0 },
    { value: "오전반차", id: 1 },
    { value: "오후반차", id: 2 },
    { value: "정시퇴근", id: 3 },
  ],
};
// 기본구조
export type Ladder = typeof mockLadder;
