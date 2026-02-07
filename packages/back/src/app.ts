import Fastify from "fastify";
import type { UseCases } from "./useCases.js";

export const buildApp = (useCases: UseCases) => {
  const fastify = Fastify({
    logger: true,
  });

  // Declare a route
  fastify.get("/", async function (request, reply) {
    reply.send(await useCases.runGameLottery.run());
  });

  return fastify;
};
