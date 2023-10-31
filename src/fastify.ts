import { Identity } from "./authenticate-plugin";

declare module "fastify" {
  interface FastifyRequest {
    identity: Identity;
  }

  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
  }
}
