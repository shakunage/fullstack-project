import { useState } from "react";
import type { GameItem } from "~/entities/GameItem";
import { useGameDetails } from "~/hooks/useGameDetails";
import { GoalScorers } from "./GoalScorers";
import { Goalies } from "./Goalies";
import Spinner from "~/components/icons/Spinner";

export function GameDetailsButton({ game_id }: { game_id: string | number }) {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, refetch, isFetching } = useGameDetails(game_id as GameItem["id"]);

  const handleToggleDetails = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.stopPropagation();
    if (!showDetails) {
      setLoading(true);

      // Only fetch if we don't already have data
      if (!data) {
        await refetch();
      }

      setShowDetails(true);
      setLoading(false);
    } else {
      setShowDetails(false);
    }
  };

  const isLoadingData = loading || isFetching;

  return (
    <>
      <button
        onClick={(event) => {
          void handleToggleDetails(event);
        }}
        className="w-full mt-4 p-2 bg-blue-500 text-white rounded text-center"
        disabled={isLoadingData}
      >
        {showDetails ? "Hide Details" : "Show Goal Scorers and Goalies"}
      </button>

      {isLoadingData && (<Spinner />)}
      {showDetails && data?.boxscore && data?.landing && (
        <div className="mt-4">
          <GoalScorers game={data.landing} />
          {/* You can now also use data.landing if needed by GoalScorers or other components */}
          <Goalies boxscoreData={data.boxscore} />
        </div>
      )}
    </>
  );
}
