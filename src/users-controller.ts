import { FastifyInstance } from "fastify";
import {
  UserParams,
  UserParamsSchema,
  UserPatchBody,
  UserPatchBodySchema,
  UserResponseSchema,
} from "./schemas";
import { usersMutationAccessPolicy } from "./users-mutation-access-policy";

export async function usersController(fastify: FastifyInstance): Promise<void> {
  fastify.patch<{
    Params: UserParams;
    Body: UserPatchBody;
  }>(
    "/:userId",
    {
      schema: {
        params: UserParamsSchema,
        body: UserPatchBodySchema,
        response: { 200: UserResponseSchema },
      },
      // No error here
      // onRequest: usersMutationAccessPolicy(fastify),
      onRequest: fastify.auth([
        // Typescript error here
        usersMutationAccessPolicy(fastify),
      ]),
    },
    async (req, res) => {
      fastify.log.info(
        { userId: req.params.userId, body: req.body },
        "Making a patch call to users",
      );
      res.send({ success: true });
    },
  );
}
