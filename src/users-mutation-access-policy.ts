import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GetUserRequestParams } from "./schemas";
import createError from '@fastify/error';

export const RESOURCE_NOT_FOUND = createError(
  'RESOURCE_NOT_FOUND',
  "Resource '%s' not found",
  404,
);

export const usersMutationAccessPolicy =
  (fastify: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      // Using a generic to extend the request so it knows it has
      // `request.params.userId`.
      Params: Partial<GetUserRequestParams>;
    }>,
  ): Promise<void> => {
    const { actorId } = request.identity;
    const isOwner = actorId === request.params.userId;

    if (isOwner) {
      return;
    }

    fastify.log.warn("Actor should not be able to see this route");

    throw new RESOURCE_NOT_FOUND(request.params.userId);
  };
