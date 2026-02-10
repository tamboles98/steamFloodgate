export interface RunLotteryResponse {
  result: {
    id: number;
    name: string;
    timePlayedMin: number;
    imageIconUrl: string;
  }[][];
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
