import { useNavigate } from "react-router";
import { useLoaderData } from "react-router";
import { matchDayLoader as loader } from "../loaders/matchDayLoader";
import { EndedGame } from "./GameCards/EndedGame";
import { FutureGame } from "./GameCards/FutureGame";
import { LiveGame } from "./GameCards/LiveGame";

export function MatchDayGames() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleGameClick = (gameId: number) => {
    void navigate(`/game/${gameId}`);
  };

  if (!data || !data.games) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.games.map((game) => (
        <div
          key={game.id}
          className="hover:bg-gray-200 cursor-pointer"
          onClick={() => handleGameClick(game.id)}
        >
          {game.gameState === "FUT" || game.gameState === "PRE" ? (
            <FutureGame game={game} />
          ) : game.gameState === "LIVE" || game.gameState === "CRIT" ? (
            <LiveGame game={game} />
          ) : game.gameState === "OFF" || game.gameState === "FINAL" ? (
            <EndedGame game={game} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
