import { test, expect } from "vitest";
import { getNextStep, getFinalDestination } from "./index";
const mockLadder1 = {
  poles: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }],
  bars: [
    {
      poleIds: ["0", "1"],
      y: [0.257, 0.312],
    },
    {
      poleIds: ["1", "2"],
      y: [0.259, 0.864],
    },
    {
      poleIds: ["1", "2"],
      y: [0.269, 0.881],
    },
    {
      poleIds: ["2", "3"],
      y: [0.888, 0.911],
    },
    {
      poleIds: ["1", "2"],
      y: [0.264, 0.871],
    },
    {
      poleIds: ["2", "3"],
      y: [0.901, 0.912],
    },

    {
      poleIds: ["2", "3"],
      y: [0.777, 0.351],
    },
  ],
  players: [
    { value: "이찬웅", poleId: "0" },
    { value: "문정재", poleId: "1" },
    { value: "윤유진", poleId: "2" },
    { value: "남창원", poleId: "3" },
  ],
  results: [
    { value: "연차", poleId: "0" },
    { value: "오전반차", poleId: "1" },
    { value: "오후반차", poleId: "2" },
    { value: "정시퇴근", poleId: "3" },
  ],
};
const mockLadder = {
  poles: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }],
  bars: [
    {
      pole1Id: "0",
      pole2Id: "1",
      pole1Y: 0.257,
      pole2Y: 0.312,
    },
    {
      pole1Id: "1",
      pole2Id: "2",
      pole1Y: 0.259,
      pole2Y: 0.864,
    },
    {
      pole1Id: "2",
      pole2Id: "3",
      pole1Y: 0.777,
      pole2Y: 0.351,
    },
  ],
  players: [
    { value: "이찬웅", poleId: "0" },
    { value: "문정재", poleId: "1" },
    { value: "윤유진", poleId: "2" },
    { value: "남창원", poleId: "3" },
  ],
  results: [
    { value: "연차", poleId: "0" },
    { value: "오전반차", poleId: "1" },
    { value: "오후반차", poleId: "2" },
    { value: "정시퇴근", poleId: "3" },
  ],
};

test("getNextStep test ", () => {
  expect(getNextStep(mockLadder, "0", 0)).toStrictEqual({
    nextPole: "1",
    nextY: 0.312,
  });
  expect(getNextStep(mockLadder, "1", 0)).toStrictEqual({
    nextPole: "2",
    nextY: 0.864,
  });

  expect(getNextStep(mockLadder, "1", 0.271)).toStrictEqual({
    //bigger than 0.271 does not exist so it will return 1
    nextPole: "0",
    nextY: 0.257,
  });

  expect(getNextStep(mockLadder, "3", 0.951)).toStrictEqual({
    //bigger than 0.271 does not exist so it will return 1
    nextPole: "3",
    nextY: 1,
  });
});

test("getFinalDestination test ", () => {
  expect(getFinalDestination(mockLadder, "0")).toStrictEqual("1");
  expect(getFinalDestination(mockLadder, "1")).toStrictEqual("2");
  // ["1" => "2(0.864)" => "1(0.264)" => "2(0.881)" => "3(0.911)"=> "2(0.901)" => "2"]
  expect(getFinalDestination(mockLadder, "3")).toStrictEqual("0");

  expect(getFinalDestination(mockLadder, "2")).toStrictEqual("3");
});
