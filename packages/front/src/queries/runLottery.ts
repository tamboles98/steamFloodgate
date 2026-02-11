import type { GameDTO } from "../domain/GameDTO";

export interface RunLotteryResponse {
  result: GameDTO[][];
}

export const createRunLotteryQuery =
  (steamUserId: string) => async (): Promise<RunLotteryResponse> => {
    const response = await fetch(`http://localhost:3000/${steamUserId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to run lottery");
    }
    return (await response.json()) as RunLotteryResponse;
  };
