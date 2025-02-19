import { useLoaderData } from "react-router";
import { matchDayLoader as loader } from "../data/matchDayLoader";
import { EndedGame } from "./matchDayGame/endedGame";
import { FutureGame } from "./matchDayGame/futureGame";
import { LiveGame } from "./matchDayGame/liveGame";

export function MatchDayGames() {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No games scheduled for today</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((game) => (
        <>
          {game.gameState === "FUT" ? (
            <FutureGame game={game} />
          ) : game.gameState === "LIVE" ? (
            <LiveGame game={game} />
          ) : game.gameState === "OFF" ? (
            <EndedGame game={game} />
          ) : null}
        </>
      ))}
    </div>
  );
}
