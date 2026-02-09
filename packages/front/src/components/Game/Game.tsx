import { type GameDTO } from "../../domain/GameDTO";
import "./Game.css";

export interface GameProps {
  game: GameDTO;
}

export const Game = ({ game }: GameProps) => {
  const { name, hoursPlayed, appId, imageIcon } = game;
  const iconUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${imageIcon}.jpg`;
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
      <p className="hoursPlayed">Horas jugadas: {hoursPlayed}</p>
    </article>
  );
};
