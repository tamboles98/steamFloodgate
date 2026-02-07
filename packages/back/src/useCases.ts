import { RunGameLottery } from "./application/runGameLottery.js";
import type { Services } from "./services.js";

export const buildUseCases = (services: Services) => {
  return {
    runGameLottery: new RunGameLottery(services.libraryService),
  };
};

export type UseCases = ReturnType<typeof buildUseCases>;
