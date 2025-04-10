import React from "react";
import { useLoaderData } from "react-router";
import { matchDayLoader as loader } from "../loaders/matchDayLoader";
import { EndedGame } from "./GameCards/EndedGame";
import { FutureGame } from "./GameCards/FutureGame";
import { LiveGame } from "./GameCards/LiveGame";

export function MatchDayGames() {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No games scheduled for today</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((game) => (
        <React.Fragment key={game.id}>
          {game.gameState === "FUT" ? (
            <FutureGame game={game} />
          ) : game.gameState === "LIVE" || game.gameState === "CRIT" ? (
            <LiveGame game={game} />
          ) : game.gameState === "OFF" || game.gameState === "FINAL" ? (
            <EndedGame game={game} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}
