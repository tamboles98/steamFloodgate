import type { Game } from "./domain/Game.js";
import { HttpSteamLibraryService } from "./infrastructure/HttpSteamLibraryService.js";

const STEAM_KEY = process.env.STEAM_KEY!
const STEAM_USER_ID = process.env.STEAM_USER_ID!

const main = async (): Promise<void> => {
    const streamLibraryService = new HttpSteamLibraryService(STEAM_USER_ID, STEAM_KEY)
    const games = await streamLibraryService.getOwnLibrary();
    const unplayedGames = games.filter(game => game.timePlayedMin <= 60 * 2);
    const package1 = selectRandomElements(unplayedGames, 3);
    const package2 = selectRandomElements(unplayedGames, 3);
    const package3 = selectRandomElements(unplayedGames, 3);
    printGameList(package1, "Package 1");
    printGameList(package2, "Package 2");
    printGameList(package3, "Package 3");
};

function printGameList(games: Game[], label: string): void {
    console.log(label);
    console.log("===============");
    for (const game of games) {
        console.log(`${game.name} (Played: ${game.timePlayedMin} min)`);
    }
    console.log("\n");
}

function selectRandomElements<T>(array: T[], n: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, array.length));
}

await main();

