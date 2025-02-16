import fastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

export default fp(
  async (app) => {
    // app.register(fastifyCors, {
    //   preflightContinue: true,
    // });
  },
  {
    name: "app.cors",
  },
);
