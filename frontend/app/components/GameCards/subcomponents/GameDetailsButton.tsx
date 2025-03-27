import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import type { GameItem } from "../../../entities/GameItem";
import type { BoxscoreData } from "../../../entities/BoxscoreData";
import { GoalScorers } from "./GoalScorers";
import { Goalies } from "./Goalies";

export function GameDetailsButton({ game }: { game: GameItem }) {
  const [showDetails, setShowDetails] = useState(false);
  const [boxscoreData, setBoxscoreData] = useState<BoxscoreData>({} as BoxscoreData);
  const fetcher = useFetcher();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fetcher.data) {
      setBoxscoreData(fetcher.data as BoxscoreData);
      setShowDetails(true);
    }
  }, [fetcher.data]);

  const handleToggleDetails = async (): Promise<void> => {
    if (!showDetails) {
      setLoading(true);
      await fetcher.load(`/games/${game.gameDate}/${game.id}`);
      setLoading(false);
    } else {
      setShowDetails(false);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          void handleToggleDetails();
        }}
        className="w-full mt-4 p-2 bg-blue-500 text-white rounded text-center"
      >
        {showDetails ? "Hide Details" : "Show Goal Scorers and Goalies"}
      </button>
      {loading && <div className="spinner mt-4">Loading...</div>}
      {showDetails && boxscoreData && (
        <div className="mt-4">
          <GoalScorers game={game} />
          <Goalies boxscoreData={boxscoreData} />
        </div>
      )}
    </>
  );
}
