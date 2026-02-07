import type { Game } from "./Game.js"

export interface LibraryService {
    getOwnLibrary(): Promise<Game[]>
}