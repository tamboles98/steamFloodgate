import { createFileRoute } from "@tanstack/react-router";
import { GameListing } from "../../components/GameListing";
import type { GameDTO } from "../../domain/GameDTO";
import "./result.css";

export const Route = createFileRoute("/$steamId/result")({
  component: RouteComponent,
});

function RouteComponent() {
  const game: GameDTO = {
    appId: 440,
    name: "Team Fortress 2",
    hoursPlayed: 33365,
    imageIcon: "f568912870a4684f9ec76277a1a404dda6bab213",
  };

  return (
    <div className="resultPage">
      <GameListing games={[game, game, game]} />
    </div>
  );
}
