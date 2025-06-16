import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import { fetchLanding } from "~/services/nhlApiServices/gameLandingService";
import type { GameItem } from "../../../entities/GameItem";
import type { BoxscoreData } from "../../../entities/Boxscore";
import type { GameLandingData } from "../../../entities/GameLanding";
import { GoalScorers } from "./GoalScorers";
import { Goalies } from "./Goalies";

export function GameDetailsButton({game_id}: { game_id: string | number }) {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data,
    refetch,
    isFetching,
  } = useQuery<{ boxscore: BoxscoreData; landing: GameLandingData }>({
    queryKey: ["boxscoreLandingData", game_id],
    queryFn: async () => {
      const [boxscoreData, landingData] = await Promise.all([
        fetchBoxscore(game_id),
        fetchLanding(game_id),
      ]);
      return { boxscore: boxscoreData, landing: landingData };
    },
    enabled: false, // Don't run on mount
    staleTime: 60 * 1000, // 1 minute
  });

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

      {isLoadingData && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

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
