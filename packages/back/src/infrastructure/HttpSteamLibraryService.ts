import type { Config } from "../config.js";
import type { Game } from "../domain/Game.js";
import type { LibraryService } from "../domain/LibraryService.js";
import { SteamUserNotFoundError } from "../domain/errors/SteamUserNotFoundError.js";

export class HttpSteamLibraryService implements LibraryService {
  constructor(private readonly apiKey: Config["STEAM_KEY"]) {}

  async getLibraryByUserId(userId: string): Promise<Game[]> {
    const steamResponse = await this.getSteamLibraryData(userId);
    return this.mapSteamLibraryToGames(steamResponse);
  }

  private async getSteamLibraryData(userId: string): Promise<LibraryData> {
    const libraryResponse = await this.fetchSteamLibraryData(userId);
    if (isEmptyLibraryResponse(libraryResponse)) {
      throw new SteamUserNotFoundError(userId);
    }
    return libraryResponse;
  }

  private async fetchSteamLibraryData(
    userId: string,
  ): Promise<LibraryResponse> {
    const request = this.buildRequest(userId);
    const rawResponse = await this.handleRequest(request);
    return this.parseRawResponsePayload(rawResponse).response;
  }

  private buildRequest(userId: string): Request {
    const requestOptions = {
      method: "GET",
    };

    const params = new URLSearchParams({
      format: "json",
      steamid: userId,
      include_appinfo: "true",
      key: this.apiKey,
    });

    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001?${params}`;
    return new Request(url, requestOptions);
  }

  private async handleRequest(request: Request): Promise<string> {
    const response = await fetch(request);
    if (!response.ok)
      throw new Error(
        `Failed to fetch library data: ${response.status} ${response.statusText}`,
      );
    return response.text();
  }

  private parseRawResponsePayload(
    rawResponse: string,
  ): SteamGetLibraryResponsePayload {
    const parsedResponse = JSON.parse(rawResponse);
    if (!isSteamLibraryResponse(parsedResponse)) {
      throw new Error("Invalid Steam library response");
    }
    return parsedResponse;
  }

  private mapSteamLibraryToGames(rawResponse: LibraryData): Game[] {
    return rawResponse.games.map((game) => ({
      id: game.appid,
      name: game.name,
      timePlayedMin: game.playtime_forever,
      imageIconUrl: game.img_icon_url,
    }));
  }
}

interface LibraryData {
  game_count: number;
  games: {
    appid: string;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
  }[];
}

type EmptyResponse = Record<string, never>;

type LibraryResponse = LibraryData | EmptyResponse;

interface SteamGetLibraryResponsePayload {
  response: LibraryResponse;
}

function isSteamLibraryResponse(
  message: unknown,
): message is SteamGetLibraryResponsePayload {
  return (
    typeof message === "object" &&
    message !== null &&
    "response" in message &&
    typeof message.response === "object" &&
    message.response !== null
  );
}

function isEmptyLibraryResponse(
  content: LibraryResponse,
): content is EmptyResponse {
  return Object.keys(content).length === 0;
}
