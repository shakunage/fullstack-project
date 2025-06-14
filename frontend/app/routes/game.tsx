import { useLoaderData, useParams } from "react-router";
import type { GameLandingData } from "~/entities";
import { gameLandingLoader } from "~/loaders/gameLandingLoader";
import { BackButton } from "~/components/GamePage/BackButton";
import { ThreeStars } from "~/components/GamePage/ThreeStars";
import { PenaltiesDropdown } from "~/components/GamePage/PenaltiesDropdown";
import { ScoringSummary } from "~/components/GamePage/ScoringSummary";
import { PlayerStatistics } from "~/components/GamePage/PlayerStatistics";
import { GameInformation } from "~/components/GamePage/GameInformation";
import { Team } from "~/components/GamePage/Team";

export const loader = gameLandingLoader;

export default function Game() {
  const gameLandingData = useLoaderData<typeof loader>() as GameLandingData;
  const params = useParams();
  const gameId = Number(params.gameId); // Assuming gameId is part of the route params for fetching

  if (!gameLandingData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl">Game data not found...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center pt-16 pb-4 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <BackButton />
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
          {/* Left Column: Game Header (Teams & Score) */}
          <div className="md:w-1/2 flex flex-col items-center mb-6 md:mb-0 pb-4 md:border-r md:pr-6 border-gray-200 dark:border-gray-700">
            <Team landingData={gameLandingData} home={false} />
            <Team landingData={gameLandingData} home={true} />
            {/* Game Status */}
            <div className="text-center mt-3">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {gameLandingData.gameState === "OFF" &&
                gameLandingData.periodDescriptor.periodType === "REG"
                  ? "Final"
                  : gameLandingData.gameState === "OFF" &&
                      gameLandingData.periodDescriptor.periodType === "OT" &&
                      !gameLandingData.periodDescriptor.otPeriods
                    ? "Final/OT"
                    : gameLandingData.gameState === "OFF" &&
                        gameLandingData.periodDescriptor.periodType === "OT" &&
                        gameLandingData.periodDescriptor.otPeriods
                      ? `Final/${gameLandingData.periodDescriptor.otPeriods}OT`
                      : gameLandingData.gameState === "OFF" &&
                          gameLandingData.periodDescriptor.periodType === "SO"
                        ? "Shootout"
                        : gameLandingData.gameState === "LIVE"
                          ? "Live"
                          : gameLandingData.gameScheduleState || "Scheduled"}
                {gameLandingData.clock &&
                  gameLandingData.clock.inIntermission &&
                  !gameLandingData.clock.running &&
                  " (Intermission)"}
              </p>
            </div>
          </div>

          {/* Right Column: Game Information */}
          <div className="md:w-1/2 pt-2 md:pt-0">
            <GameInformation {...gameLandingData} />
          </div>
        </div>

        {/* Team Stats - Placed below the two-column layout */}
        <div className="mb-6 border-t pt-6 border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-center">Team Stats</h3>
          <div className="flex justify-around items-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <p className="text-lg font-semibold">{gameLandingData.awayTeam.abbrev}</p>
              <p className="text-2xl">{gameLandingData.awayTeam.sog}</p>
              <p className="text-sm">Shots on Goal</p>
            </div>
            <div className="text-gray-400 dark:text-gray-500">vs</div>
            <div>
              <p className="text-lg font-semibold">{gameLandingData.homeTeam.abbrev}</p>
              <p className="text-2xl">{gameLandingData.homeTeam.sog}</p>
              <p className="text-sm">Shots on Goal</p>
            </div>
          </div>
        </div>

        <ScoringSummary {...gameLandingData} />
        <ThreeStars {...gameLandingData} />
        <PenaltiesDropdown {...gameLandingData} />
        <PlayerStatistics landingData={gameLandingData} gameId={gameId} />
      </div>
    </main>
  );
}
