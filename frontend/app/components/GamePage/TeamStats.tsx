import { useState } from "react";
import type { GameStory, TeamGameStat } from "~/entities";

const formatStatCategory = (category: string): string => {
  switch (category) {
    case "sog":
      return "Shots on Goal";
    case "faceoffWinningPctg":
      return "Faceoff %";
    case "powerPlay":
      return "Power Play";
    case "powerPlayPctg":
      return "Power Play %";
    case "pim":
      return "PIM";
    case "hits":
      return "Hits";
    case "blockedShots":
      return "Blocked Shots";
    case "giveaways":
      return "Giveaways";
    case "takeaways":
      return "Takeaways";
    default:
      return category;
  }
};

const formatStatValue = (category: string, value: number | string): string => {
  if (typeof value === "number") {
    if (category === "faceoffWinningPctg" || category === "powerPlayPctg") {
      return `${(value * 100).toFixed(1)}%`;
    }
    return value.toString();
  }
  return value;
};

export function TeamStats({ gameLandingData }: { gameLandingData: GameStory }) {
  const { awayTeam, homeTeam, summary } = gameLandingData;
  const teamStats = summary?.teamGameStats || [];
  const [showDetailedStats, setShowDetailedStats] = useState(false);

  const handleToggleDetailedStats = () => {
    setShowDetailedStats(!showDetailedStats);
  };

  const shotsOnGoalStat = teamStats.find(stat => stat.category === "sog");

  return (
    <div className="w-full mt-6">
      {shotsOnGoalStat && (
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-750 rounded-md shadow flex justify-between items-center">
          {/* Away Team Stats Column */}
          <div className="text-center">
            <span className="block font-semibold text-gray-700 dark:text-gray-300">{awayTeam.abbrev}</span>
            <span className="block text-2xl font-bold text-gray-900 dark:text-white">
              {formatStatValue(shotsOnGoalStat.category, shotsOnGoalStat.awayValue)}
            </span>
          </div>

          {/* Stat Name Column */}
          <div className="text-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Shots on Goal</span>
          </div>

          {/* Home Team Stats Column */}
          <div className="text-center">
            <span className="block font-semibold text-gray-700 dark:text-gray-300">{homeTeam.abbrev}</span>
            <span className="block text-2xl font-bold text-gray-900 dark:text-white">
              {formatStatValue(shotsOnGoalStat.category, shotsOnGoalStat.homeValue)}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={handleToggleDetailedStats}
        className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-xl font-semibold focus:outline-none"
      >
        Detailed Team Stats {showDetailedStats ? "▲" : "▼"}
      </button>
      {showDetailedStats && (
        <div className="mt-4 overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/3">
                  {awayTeam.abbrev}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/3">
                  Stat
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/3">
                  {homeTeam.abbrev}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {teamStats.filter(stat => stat.category !== "sog").map((stat: TeamGameStat, index: number) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-750"}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-left">
                    {formatStatValue(stat.category, stat.awayValue)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                    {formatStatCategory(stat.category)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-right">
                    {formatStatValue(stat.category, stat.homeValue)}
                  </td>
                </tr>
              ))}
              {teamStats.filter(stat => stat.category !== "sog").length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                    No detailed team statistics available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
