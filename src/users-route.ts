import { FastifyInstance } from "fastify";
import { usersController } from "./users-controller";

export async function usersRoute(fastify: FastifyInstance): Promise<void> {
  fastify.addHook("onRequest", fastify.auth([fastify.authenticate]));
  fastify.register(usersController, { prefix: "/users" });
}
