# Fastify Auth Typescript Bug

This repo is intended to reproduce a Typescript bug when using `@fastify/auth`. More info in this issue – https://github.com/fastify/fastify-auth/issues/207.

## Setup

### Install dependencies:

```bash
yarn install
```

### To see the Typescript error:

```bash
yarn types:check
```

By running the above, you will see the following error:

```bash
src/users-controller.ts:29:9 - error TS2322: Type '(request: FastifyRequest<{    Params: Partial<GetUserRequestParams>;}>, reply: FastifyReply) => Promise<void>' is not assignable to type 'FastifyAuthFunction | FastifyAuthFunction[]'.
  Type '(request: FastifyRequest<{    Params: Partial<GetUserRequestParams>;}>, reply: FastifyReply) => Promise<void>' is not assignable to type 'FastifyAuthFunction'.
    Types of parameters 'request' and 'request' are incompatible.
      Type 'FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<...>>' is not assignable to type 'FastifyRequest<{ Params: Partial<{ userId: string; }>; }, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<...>>'.
        Type 'RouteGenericInterface' is not assignable to type '{ Params: Partial<{ userId: string; }>; }'.
          Types of property 'Params' are incompatible.
            Type 'unknown' is not assignable to type 'Partial<{ userId: string; }>'.

29         usersMutationAccessPolicy(fastify),
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Found 1 error in src/users-controller.ts:29
```

### Start the app:

```bash
yarn dev
```

Running a successful PATCH request:

```bash
curl -X PATCH http://localhost:8080/users/test-actor-id-123 -H 'Content-Type: application/json' -d '{ "firstName": "New Name" }'
# {"success":true}
```

Seeing the access policy force the PATCH to fail:

```bash
curl -X PATCH http://localhost:8080/users/bad-actor -H 'Content-Type: application/json' -d '{ "firstName": "New Name" }'
# {"statusCode":404,"code":"RESOURCE_NOT_FOUND","error":"Not Found","message":"Resource 'bad-actor' not found"}
```
