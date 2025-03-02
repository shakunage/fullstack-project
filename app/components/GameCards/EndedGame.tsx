import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import { boxscoreLoader } from "../../data/boxscoreLoader";
import type { GameItem, BoxscoreData } from "../../entities";
import { EndedGameHeader } from "./subcomponents/EndedGameHeader";
import { EndedGameDetails } from "./subcomponents/EndedGameDetails";
import { GoalScorers } from "./subcomponents/GoalScorers";
import { Goalies } from "./subcomponents/Goalies";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { Venue } from "./subcomponents/Venue";

export const loader = boxscoreLoader;

export function EndedGame({ game }: { game: GameItem }) {
  const [showDetails, setShowDetails] = useState(false);
  const [boxscoreData, setBoxscoreData] = useState<BoxscoreData>({} as BoxscoreData);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) {
      setBoxscoreData(fetcher.data as BoxscoreData);
      setShowDetails(true);
    }
  }, [fetcher.data]);

  const handleToggleDetails = async (): Promise<void> => {
    if (!showDetails) {
      await fetcher.load(`/games/${game.gameDate}/${game.id}`);
    } else {
      setShowDetails(false);
    }
  };

  return (
    <>
      <div key={game.id} className="bg-white shadow-md rounded-lg p-4">
        <EndedGameHeader game={game} />
        <StartTimeToggle game={game} />
        <Venue game={game} />
        <EndedGameDetails game={game} />
        <button
          onClick={() => {
            void handleToggleDetails();
          }}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded text-center"
        >
          {showDetails ? "Hide Details" : "Show Goal Scorers and Goalies"}
        </button>
        {showDetails && boxscoreData && (
          <div className="mt-4">
            <GoalScorers game={game} />
            <Goalies boxscoreData={boxscoreData} />
          </div>
        )}
      </div>
    </>
  );
}
