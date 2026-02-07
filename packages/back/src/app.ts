import Fastify from "fastify";
import { SteamUserNotFoundError } from "./domain/errors/SteamUserNotFoundError.js";
import type { UseCases } from "./useCases.js";

export const buildApp = (useCases: UseCases) => {
  const fastify = Fastify({
    logger: true,
  });

  const opts = {
    schema: {
      querystring: {
        type: "object",
        properties: {
          steamUserId: { type: "string" },
        },
      },
    },
  };

  type RequestQuery = {
    steamUserId: string;
  };

  // Declare a route
  fastify.get<{
    Querystring: RequestQuery;
  }>("/", opts, async function (request, reply) {
    try {
      reply.send(await useCases.runGameLottery.run(request.query.steamUserId));
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
