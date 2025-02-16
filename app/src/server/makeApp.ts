import path from "node:path";
import fastifyAutoload from "@fastify/autoload";
import fastify from "fastify";

export function makeApp() {
  const app = fastify({
    logger: true,
  });

  app.register(fastifyAutoload, {
    dir: path.resolve("./dist/server/plugins"),
  });

  app.get("/healthz", async () => {
    return {
      ok: true,
    };
  });

  return app;
}
