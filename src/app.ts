import "./fastify";
import fastifyAuth from "@fastify/auth";
import fastify, { FastifyInstance } from "fastify";
import { usersRoute } from "./users-route";
import { fastifyAuthenticate } from "./authenticate-plugin";

const server: FastifyInstance = fastify();
server.register(fastifyAuth);
server.register(fastifyAuthenticate);
server.register(usersRoute);

server.addHook("onReady", () => {
  server.log.info("Server is ready for requests");
});

export { server };
