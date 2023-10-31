import fp from "fastify-plugin";
import { FastifyPluginAsync, FastifyRequest } from "fastify";

export interface Identity {
  /**
   * The requesting actor's ID
   */
  actorId: string;
}

export const plugin: FastifyPluginAsync = async (fastify) => {
  const logger = fastify.log.child({ module: "authentication-plugin" });
  logger.info("Registering plugin");

  fastify.decorateRequest("identity", null);

  async function authenticate(request: FastifyRequest): Promise<void> {
    // Skipping authentication check to keep this simple

    request.identity = {
      actorId: "test-actor-id-123",
    };
  }

  fastify.decorate("authenticate", authenticate);
  logger.info("Plugin registered");

  return Promise.resolve();
};

export const fastifyAuthenticate = fp(plugin, {
  fastify: "4.x",
  name: "authentication-plugin",
});
