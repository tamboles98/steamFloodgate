import { createFileRoute } from "@tanstack/react-router";
import { GameListing } from "../../components/GameListing";
import "./result.css";

import { useQuery } from "@tanstack/react-query";
import { createRunLotteryQuery } from "../../queries/runLottery";

export const Route = createFileRoute("/$steamId/result")({
  component: RouteComponent,
});

function RouteComponent() {
  const { steamId } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["runLottery", steamId],
    queryFn: createRunLotteryQuery(steamId),
  });

  return (
    <div className="resultPage">
      {data?.result.map((gamePackage) => (
        <GameListing games={gamePackage} />
      ))}
    </div>
  );
}
