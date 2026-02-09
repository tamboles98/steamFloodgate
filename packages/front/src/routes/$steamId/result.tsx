import { createFileRoute } from "@tanstack/react-router";
import { Game } from "../../components/Game";

export const Route = createFileRoute("/$steamId/result")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ul>
        <li>
          <Game
            name="Team Fortress 2"
            hoursPlayed={33365}
            appId={440}
            imageIcon="f568912870a4684f9ec76277a1a404dda6bab213"
          />
        </li>
        <li>
          <Game
            name="Team Fortress 2"
            hoursPlayed={33365}
            appId={440}
            imageIcon="f568912870a4684f9ec76277a1a404dda6bab213"
          />
        </li>
        <li>
          <Game
            name="Team Fortress 2"
            hoursPlayed={33365}
            appId={440}
            imageIcon="f568912870a4684f9ec76277a1a404dda6bab213"
          />
        </li>
      </ul>
    </div>
  );
}
