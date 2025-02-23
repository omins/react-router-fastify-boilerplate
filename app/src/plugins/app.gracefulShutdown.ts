import fastifyGracefulShutdown from "fastify-graceful-shutdown";
import fp from "fastify-plugin";

export default fp(
  async (app) => {
    app.register(fastifyGracefulShutdown);
  },
  {
    name: "app.gracefulShutdown",
  },
);
