import { useLoaderData } from 'react-router';
import { BackButton } from '~/components/GamePage/BackButton';
import { ThreeStars } from '~/components/GamePage/ThreeStars';
import { PenaltiesDropdown } from '~/components/GamePage/PenaltiesDropdown';
import { ScoringSummary } from '~/components/GamePage/ScoringSummary';
import { PlayerStatistics } from '~/components/GamePage/PlayerStatistics';
import { GameInformation } from '~/components/GamePage/GameInformation';
import { Team } from '~/components/GamePage/Team';
import { GameStatus } from '~/components/GamePage/GameStatus';
import { TeamStats } from '~/components/GamePage/TeamStats';
import { gameStoryLoader } from '~/loaders/gameStoryLoader';
import type { GameStory } from '~/entities';

export const loader = gameStoryLoader;

export default function Game() {
  const gameStoryData: GameStory = useLoaderData<typeof loader>();

  if (!gameStoryData) {
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
            <Team storyData={gameStoryData} home={false} />
            <Team storyData={gameStoryData} home={true} />
            <GameStatus storyData={gameStoryData} />
          </div>
          {/* Right Column: Game Information */}
          <GameInformation storyData={gameStoryData} />
        </div>
        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        {/* Team Stats (SOG display and dropdown for detailed stats) - Placed below the two-column layout */}
        <TeamStats gameLandingData={gameStoryData} />
        {/* From here on, the components are stacked vertically */}
        <ScoringSummary storyData={gameStoryData} />
        {gameStoryData.gameState !== 'FUT' && (
          <PenaltiesDropdown game_id={gameStoryData.id} />
        )}
        <PlayerStatistics storyData={gameStoryData} />
        <ThreeStars storyData={gameStoryData} />
      </div>
    </main>
  );
}
