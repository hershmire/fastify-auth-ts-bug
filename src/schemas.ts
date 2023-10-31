import { Static, Type } from "@sinclair/typebox";

export const UserParamsSchema = Type.Object({
  userId: Type.String(),
});

export const UserPatchBodySchema = Type.Object({
  firstName: Type.String(),
});

export const UserResponseSchema = Type.Object({
  success: Type.Boolean(),
});

export const GetUserRequestParamsSchema = Type.Object({
  userId: Type.String(),
});

export type UserParams = Static<typeof UserParamsSchema>;
export type UserPatchBody = Static<typeof UserPatchBodySchema>;
export type UserResponse = Static<typeof UserResponseSchema>;
export type GetUserRequestParams = Static<typeof GetUserRequestParamsSchema>;
