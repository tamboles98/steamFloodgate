import type { GameId } from "./GameId";

export interface Game {
    id: GameId,
    name: string,
    timePlayedMin: number
}