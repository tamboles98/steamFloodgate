import cors from "@fastify/cors";
import Fastify from "fastify";
import { SteamUserNotFoundError } from "./domain/errors/SteamUserNotFoundError.js";
import type { UseCases } from "./useCases.js";

export const buildApp = async (useCases: UseCases) => {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: "*", // Allow all origins for now
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
