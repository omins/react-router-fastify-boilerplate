import fastify from "fastify";

export function makeApp() {
  const app = fastify();

  app.get("/healthz", async () => {
    return {
      ok: true,
    };
  });

  return app;
}
