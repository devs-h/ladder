export const mockLadder = {
  verticalLines: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
  horizontalLines: [
    {
      p1Id: 0,
      p2Id: 1,
      p1Y: 0.257,
      p2Y: 0.312,
    },
    {
      p1Id: 1,
      p2Id: 2,
      p1Y: 0.259,
      p2Y: 0.864,
    },
    {
      p1Id: 2,
      p2Id: 3,
      p1Y: 0.777,
      p2Y: 0.351,
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
