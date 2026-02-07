export class SteamUserNotFoundError extends Error {
  constructor(userId: string) {
    super(`Steam user with ID ${userId} not found.`);
    this.name = "SteamUserNotFoundError";
  }
}
