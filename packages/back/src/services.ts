import config from "./config.js";
import { HttpSteamLibraryService } from "./infrastructure/HttpSteamLibraryService.js";

export interface Services {
  libraryService: HttpSteamLibraryService;
}

export const buildServices = () => {
  return {
    libraryService: new HttpSteamLibraryService(
      config.STEAM_USER_ID,
      config.STEAM_KEY,
    ),
  };
};
