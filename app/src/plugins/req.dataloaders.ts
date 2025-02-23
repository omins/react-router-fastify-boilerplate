import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyRequest {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    dataloaders: {};
  }
}

export default fp(
  async (app) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    app.decorateRequest("dataloaders", null as any);

    app.addHook("preHandler", async (req, reply) => {
      req.dataloaders = {};
    });
  },
  {
    name: "req.dataloaders",
  },
);
