import type { GameLandingData } from "~/entities";

export function TeamStats({ gameLandingData }: { gameLandingData: GameLandingData }) {
  return (
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
  );
}
