import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GetUserRequestParams } from "./schemas";

export const usersMutationAccessPolicy =
  (fastify: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      // Using a generic to extend the request so it knows it has
      // `request.params.userId`.
      Params: Partial<GetUserRequestParams>;
    }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { actorId } = request.identity;
    const isOwner = actorId === request.params.userId;

    if (isOwner) {
      return;
    }

    fastify.log.warn("Actor should not be able to see this route");

    // This resource shouldn't be reached by the current actor so we should hide
    // it. Letting the actor know that resource exists could possibly lead to
    // Insecure Direct Object References (IDOR), an access control vulnerability
    // based on the knowledge of resources you shouldn't access.
    reply.callNotFound();
  };
