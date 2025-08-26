// 기본구조
export interface Ladder {
  "verticalLines": [
    { "id": 0 },
    { "id": 1 },
    { "id": 2 },
    { "id": 3 },
  ],
  "horizontalLines": [
    {
      "from": 0,
      "to": 1,
      "yFrom": 0.2,
      "yTo": 0.3,
    },
    {
      "from": 1,
      "to": 2,
      "yFrom": 0.5,
      "yTo": 0.5,
    },
    {
      "from": 2,
      "to": 3,
      "yFrom": 0.7,
      "yTo": 0.6,
    }
  ],
  "players": [
    { "name": "이찬웅", "startLine": 0 },
    { "name": "문정재", "startLine": 1 },
    { "name": "윤유진", "startLine": 2 },
    { "name": "남창원", "startLine": 3 },
  ],
  "results": [
    { "line": 0, "value": "연차" },
    { "line": 1, "value": "오전반차" },
    { "line": 2, "value": "오후반차" },
    { "line": 3, "value": "정시퇴근" },
  ]
}
