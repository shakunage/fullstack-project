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

  return (
    <div className="mb-6 border-t pt-6 border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-center">Team Stats</h3>
      <div className="overflow-x-auto rounded-lg shadow">
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
            {teamStats.map((stat: TeamGameStat, index: number) => (
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
            {teamStats.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                  No team statistics available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
