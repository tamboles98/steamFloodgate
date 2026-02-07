import type { Game } from "./Game.js";

export interface LibraryService {
  getLibraryByUserId(userId: string): Promise<Game[]>;
}
