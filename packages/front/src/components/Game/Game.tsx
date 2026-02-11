import { type GameDTO } from "../../domain/GameDTO";
import { getGameIconFullUrl } from "../../utils/gameIcons";
import "./Game.css";

export interface GameProps {
  game: GameDTO;
}

export const Game = ({ game }: GameProps) => {
  const { name, timePlayedMin } = game;
  const iconUrl = getGameIconFullUrl(game);
  return (
    <article className="game-card">
      <div className="gameInfo">
        <img
          src={iconUrl}
          alt={`${name} icon`}
          role="presentation"
          className="gameIcon"
        />
        <h3 className="gameName">{name}</h3>
      </div>
      <p className="hoursPlayed">
        Horas jugadas: {(timePlayedMin / 60).toFixed(1)}
      </p>
    </article>
  );
};
