# ladder

1. 실행방법

   1. bun i
   1. bun dev:

1. 작업순서

   1. 작업하기로 정한 packages/무언가에서 작업을 합니다.
   1. 작업하다 다른곳에 사용해야하면 그때 작성자가 공통화를 진행합니다. (미리 공통화 하지 않습니다.)

1. 외부 라이브러리에 대해

   1. 사용을 지양합니다.
   1. 외부라이브러리보다 차라리 복붙 or ai로 생성해서 내부 코드화 하는게 어떨까 싶어요.

1. 공통 패키지.
   1. 타입스

"dev": "node scripts/dev.cjs", // demo + 원하는 패키지 실행 bun dev kit
"dev:demo": "bun --hot demo/src/index.tsx", // 데모만 실행
"dev:core": "bun run -F @ladder/core dev", // 코어만 실행
"dev:canvas": "bun run -F @ladder/canvas dev", //
"dev:kit": "bun run -F @ladder/kit dev",
"build:core": "bun run -F @ladder/core build", //코어만 빌드
"build:canvas": "bun run -F @ladder/canvas build",
"build:kit": "bun run -F @ladder/kit build",
