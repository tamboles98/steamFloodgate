import { config } from "../config";
import type { GameDTO } from "../domain/GameDTO";

export interface RunLotteryResponse {
  result: GameDTO[][];
}

export const createRunLotteryQuery =
  (steamUserId: string) => async (): Promise<RunLotteryResponse> => {
    const response = await fetch(`${config.backendUrl}/${steamUserId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to run lottery");
    }
    return (await response.json()) as RunLotteryResponse;
  };
