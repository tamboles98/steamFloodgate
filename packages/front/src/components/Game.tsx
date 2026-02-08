export const Game = ({
  name,
  hoursPlayed,
  appId,
  imageIcon,
}: {
  name: string;
  hoursPlayed: number;
  appId: number;
  imageIcon: string;
}) => {
  const iconUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${imageIcon}.jpg`;
  return (
    <article className="game-card">
      <img
        src={iconUrl}
        alt={`${name} icon`}
        role="presentation"
        className="gameIcon"
      />
      <div className="gameInfo">
        <h3>{name}</h3>
        <p>Horas jugadas: {hoursPlayed}</p>
      </div>
    </article>
  );
};
