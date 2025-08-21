import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production",
});

// HMR 환경에서 모듈 교체/종료 시 정리
if (import.meta?.hot) {
  import.meta.hot.dispose(async () => {
    await server.stop(true); // 강제 종료(모든 커넥션 끊기)
  });
}

// 터미널에서 Ctrl+C 등 시그널 처리
process.on("SIGINT", async () => {
  await server.stop(true);
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await server.stop(true);
  process.exit(0);
});

// 이 서버만 남았을 때 프로세스가 자연 종료되도록
server.unref();
