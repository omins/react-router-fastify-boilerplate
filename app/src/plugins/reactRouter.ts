import type http from "node:http";
import type http2 from "node:http2";
import type https from "node:https";
import { reactRouterFastify } from "@mcansh/remix-fastify/react-router";
import type {
  FastifyInstance,
  FastifyRequest,
  RouteGenericInterface,
} from "fastify";
import fp from "fastify-plugin";

type HttpServer =
  | http.Server
  | https.Server
  | http2.Http2Server
  | http2.Http2SecureServer;

declare module "react-router" {
  interface AppLoadContext {
    app: FastifyInstance;
    req: FastifyRequest<RouteGenericInterface, HttpServer>;
  }
}

export default fp(
  async (app) => {
    console.log("registering react router");
    app.register(reactRouterFastify, {
      buildDirectory: "./dist/web",
      async getLoadContext(req) {
        return {
          app,
          req,
        };
      },
    });
  },
  {
    name: "reactRouter",
    dependencies: ["app.env", "app.gracefulShutdown"],
  },
);
