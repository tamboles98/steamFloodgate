import type { Game } from "../domain/Game.js";
import type { LibraryService } from "../domain/LibraryService.js";

function selectRandomElements<T>(array: T[], n: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, array.length));
}

type GamePackage = Game[];

export interface GameLotteryResult {
  details: {
    packages: number;
    gamesPerPackage: number;
  };
  result: GamePackage[];
}

export class RunGameLottery {
  constructor(private readonly libraryService: LibraryService) {}

  async run(steamUserId: string): Promise<GameLotteryResult> {
    const games = await this.libraryService.getLibraryByUserId(steamUserId);
    const unplayedGames = games.filter((game) => game.timePlayedMin <= 60 * 2);
    const lotteryDetails = {
      packages: 3,
      gamesPerPackage: 3,
    };
    const packages = Array.from({ length: lotteryDetails.packages }, () =>
      selectRandomElements(unplayedGames, lotteryDetails.gamesPerPackage),
    );
    return {
      details: lotteryDetails,
      result: packages,
    };
  }
}
