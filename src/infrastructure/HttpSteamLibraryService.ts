import type { Game } from "../domain/Game.js";
import type { LibraryService } from "../domain/LibraryService.js";

export class HttpSteamLibraryService implements LibraryService {
  private readonly request: Request;
  constructor(
    userId: string, apiKey: string
  ) {
    this.request = this.buildRequest(userId, apiKey);
  }

  async getOwnLibrary(): Promise<Game[]> {
    const steamResponse = await this.getData();
    return this.mapSteamResponseToGames(steamResponse);
  }

  private async getData(): Promise<SteamGetOwnLibraryResponse> {
    const response = await fetch(this.request);
    const responseText = await response.text();
    return this.parseRawResponse(responseText);
  }

  private mapSteamResponseToGames(
    rawResponse: SteamGetOwnLibraryResponse
  ): Game[] {
    return rawResponse.response.games.map((game) => ({
      id: game.appid,
      name: game.name,
      timePlayedMin: game.playtime_forever,
    }));
  }

  private buildRequest(userId: string, apiKey: string): Request {
    const requestOptions = {
      method: "GET",
    };

    const params = new URLSearchParams({
      format: "json",
      steamid: userId,
      include_appinfo: "true",
      key: apiKey,
    });

    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001?${params}`;
    return new Request(url, requestOptions);
  }

  private parseRawResponse(rawResponse: string): SteamGetOwnLibraryResponse {
    const parsedResponse = JSON.parse(rawResponse);
    if (!isSteamOwnLibraryResponse(parsedResponse)) {
      throw new Error("Invalid Steam own library response");
    }
    return parsedResponse;
  }
}

interface SteamGetOwnLibraryResponse {
  response: {
    game_count: number;
    games: {
      appid: string;
      name: string;
      playtime_forever: number;
    }[];
  };
}

function isSteamOwnLibraryResponse(
  message: any
): message is SteamGetOwnLibraryResponse {
  return message && message.response && Array.isArray(message.response.games);
}

