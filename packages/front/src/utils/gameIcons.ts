import type { GameDTO } from "../domain/GameDTO";

export const getGameIconFullUrl = (game: GameDTO) => {
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${game.id}/${game.imageIconUrl}.jpg`;
};
