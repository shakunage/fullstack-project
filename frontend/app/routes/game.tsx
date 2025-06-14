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
import { GameStatus } from "~/components/GamePage/GameStatus";
import { TeamStats } from "~/components/GamePage/TeamStats";

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
            <GameStatus gameLandingData={gameLandingData} />
          </div>
          {/* Right Column: Game Information */}
          <GameInformation {...gameLandingData} />
        </div>
        {/* Team Stats - Placed below the two-column layout */}
        <TeamStats gameLandingData={gameLandingData} />
        {/* From here on, the components are stacked vertically */}
        <ScoringSummary {...gameLandingData} />
        <ThreeStars {...gameLandingData} />
        <PenaltiesDropdown {...gameLandingData} />
        <PlayerStatistics landingData={gameLandingData} gameId={gameId} />
      </div>
    </main>
  );
}
