import Fastify from "fastify";
import { SteamUserNotFoundError } from "./domain/errors/SteamUserNotFoundError.js";
import type { UseCases } from "./useCases.js";

export const buildApp = (useCases: UseCases) => {
  const fastify = Fastify({
    logger: true,
  });

  const opts = {
    schema: {
      params: {
        type: "object",
        properties: {
          steamUserId: { type: "string" },
        },
        required: ["steamUserId"],
      },
    },
  };

  type RequestParams = {
    steamUserId: string;
  };

  // Declare a route
  fastify.get<{
    Params: RequestParams;
  }>("/:steamUserId", opts, async function (request, reply) {
    try {
      reply.send(await useCases.runGameLottery.run(request.params.steamUserId));
    } catch (error) {
      request.log.error(error);
      if (error instanceof SteamUserNotFoundError) {
        return reply.status(404).send({ error: error.message });
      }
      throw error;
    }
  });

  return fastify;
};
