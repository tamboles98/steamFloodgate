import type { GameDTO } from "../../domain/GameDTO";
import { Game } from "../Game/Game";
import "./GameListing.css";

export interface GameListingProps {
  games: GameDTO[];
}

export const GameListing = ({ games }: GameListingProps) => {
  return (
    <ul className="gameListing">
      {games.map((game) => (
        <li key={game.id} className="gameListingItem">
          <Game game={game} />
        </li>
      ))}
    </ul>
  );
};
