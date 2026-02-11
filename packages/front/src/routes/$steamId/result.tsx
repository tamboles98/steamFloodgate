import { createFileRoute } from "@tanstack/react-router";
import { GameListing } from "../../components/GameListing";
import "./result.css";

import { useQuery } from "@tanstack/react-query";
import ErrorWindow from "../../components/ErrorWindow";
import { createRunLotteryQuery } from "../../queries/runLottery";

export const Route = createFileRoute("/$steamId/result")({
  component: RouteComponent,
});

function RouteComponent() {
  const { steamId } = Route.useParams();
  const { data, error } = useQuery({
    queryKey: ["runLottery", steamId],
    queryFn: createRunLotteryQuery(steamId),
    retry: false,
  });

  if (error) {
    return <ErrorWindow message="Oops! Algo salió mal." />;
  }

  return (
    <div className="resultPage">
      {data?.result.map((gamePackage) => (
        <GameListing games={gamePackage} />
      ))}
    </div>
  );
}
