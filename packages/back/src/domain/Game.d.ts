import type { GameId } from "./GameId.js";

export interface Game {
  id: GameId;
  name: string;
  timePlayedMin: number;
  imageIconUrl: string;
}
