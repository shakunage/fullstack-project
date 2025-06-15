import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import { skaterBoxscoreConstants, goalieBoxscoreConstants } from "~/constants/boxscoreConstants";
import { type BoxscoreData, type GameStory, type PlayerStats } from "~/entities";
import { toiToSeconds } from "~/utils/toiToSeconds";

export function PlayerStatistics({ storyData, gameId }: { storyData: GameStory; gameId: number }) {
  const [showPlayerStats, setShowPlayerStats] = useState(false);
  const [sortConfig, setSortConfig] = useState<
    Record<string, { key: string; direction: "ascending" | "descending" }>
  >({});

  const {
    data: fetchedBoxscoreData,
    refetch: refetchBoxscore,
    isFetching: isFetchingBoxscore,
    error: boxscoreError,
  } = useQuery<BoxscoreData, Error>({
    queryKey: ["boxscoreData", gameId],
    queryFn: async () => {
      if (!storyData?.gameDate || !storyData?.id) {
        throw new Error("Game date or ID is missing for fetching boxscore.");
      }
      return fetchBoxscore(storyData.id);
    },
    enabled: false,
    staleTime: 60 * 1000,
  });

  const handleTogglePlayerStats = async () => {
    if (!showPlayerStats && !fetchedBoxscoreData && !isFetchingBoxscore) {
      // If opening, no data yet, and not already fetching
      try {
        await refetchBoxscore();
      } catch (error) {
        console.error("Failed to fetch boxscore:", error);
        // Optionally set an error state here to display to the user
      }
    }
    setShowPlayerStats(!showPlayerStats);
  };

  const getSortableValue = (player: PlayerStats, key: string): string | number | undefined => {
    if (key === "name") return player.name.default.toLowerCase();
    if (key === "toi") return toiToSeconds(player.toi);

    // Access nested properties if key contains a dot (e.g. 'name.default')
    // This is a simple implementation; for deeper nesting, a more robust solution might be needed.
    const keys = key.split(".");
    let value: any = player;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return undefined; // Property not found
      }
    }

    if (typeof value === "string") return value.toLowerCase();
    if (typeof value === "number") return value;
    return value;
  };

  const requestSort = (tableId: string, key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig[tableId]?.key === key && sortConfig[tableId]?.direction === "ascending") {
      direction = "descending";
    }
    // If sorting a new column, or re-sorting the same column, reset or toggle direction
    setSortConfig((prevConfig) => ({
      ...prevConfig, // Preserve other table sort configs if any
      [tableId]: { key, direction },
    }));
  };
  return (
    <>
      {(storyData.gameState === "OFF" ||
        storyData.gameState === "LIVE" ||
        storyData.gameState === "CRIT") &&
        storyData.id && (
          <div className="w-full mt-6">
            <button
              onClick={handleTogglePlayerStats}
              className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-xl font-semibold focus:outline-none disabled:opacity-50"
              disabled={isFetchingBoxscore}
            >
              Player Statistics {showPlayerStats ? "▲" : "▼"}
            </button>
          </div>
        )}
      {/* Loading Indicator for Boxscore */}
      {isFetchingBoxscore && (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error Message for Boxscore Fetch */}
      {boxscoreError && !isFetchingBoxscore && (
        <div className="mt-4 text-red-500 text-center">
          <p>Error loading player statistics: {boxscoreError.message}</p>
        </div>
      )}

      {/* Player Stats Content (Conditional Rendering) */}
      {showPlayerStats && fetchedBoxscoreData && !isFetchingBoxscore && (
        <div className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            {/* Team Stats Rendering Logic */}
            {(["awayTeam", "homeTeam"] as const).map((teamType) => {
              // Use fetchedBoxscoreData for player stats, and gamestoryData for team names/logos if needed
              const teamStatsData = fetchedBoxscoreData.playerByGameStats?.[teamType];
              const teamDisplayDetails = storyData[teamType]; // For logo, name etc.

              if (!teamStatsData) return null;

              return (
                <div key={teamType}>
                  <h3 className="text-xl font-semibold mb-3 text-center">
                    {teamDisplayDetails.name.default}
                  </h3>
                  {(["forwards", "defense", "goalies"] as const).map((positionKey) => {
                    const playersAtPosition: PlayerStats[] =
                      teamStatsData[positionKey as keyof typeof teamStatsData] || [];
                    if (playersAtPosition.length === 0) {
                      return (
                        <p key={positionKey} className="my-2 text-sm text-gray-500 dark:text-gray-400">
                          No {positionKey} data available.
                        </p>
                      );
                    }

                    const tableId = `${teamType}-${positionKey}`;
                    const currentColumns =
                      positionKey === "goalies" ? goalieBoxscoreConstants : skaterBoxscoreConstants;

                    let processedPlayers = [...playersAtPosition];
                    const currentSort = sortConfig[tableId];

                    if (currentSort?.key) {
                      processedPlayers.sort((a, b) => {
                        const valA = getSortableValue(a, currentSort.key);
                        const valB = getSortableValue(b, currentSort.key);

                        if (valA === undefined || valA === null)
                          return currentSort.direction === "ascending" ? 1 : -1; // Push undefined/null to one end
                        if (valB === undefined || valB === null)
                          return currentSort.direction === "ascending" ? -1 : 1;

                        if (typeof valA === "number" && typeof valB === "number") {
                          return currentSort.direction === "ascending" ? valA - valB : valB - valA;
                        }
                        if (typeof valA === "string" && typeof valB === "string") {
                          return currentSort.direction === "ascending"
                            ? valA.localeCompare(valB)
                            : valB.localeCompare(valA);
                        }
                        // Fallback for mixed types or other unhandled types (should ideally not happen with good data)
                        return 0;
                      });
                    }

                    return (
                      <div key={positionKey} className="w-full mb-6">
                        <h4 className="text-lg font-semibold mb-2 capitalize">{positionKey}</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                {currentColumns.map((col) => (
                                  <th
                                    key={col.key}
                                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    onClick={() => col.sortable && requestSort(tableId, col.key)}
                                  >
                                    {col.label}
                                    {currentSort?.key === col.key && (
                                      <span>{currentSort.direction === "ascending" ? " ▲" : " ▼"}</span>
                                    )}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {processedPlayers.map((player) => (
                                <tr key={player.playerId}>
                                  {currentColumns.map((col) => {
                                    let cellValue: any;
                                    if (col.key === "name") {
                                      const name = player.name.default;
                                      cellValue =
                                        name.length > 12 ? `${name.substring(0, 12)}...` : name;
                                    } else if (col.key === "savePctg") {
                                      cellValue =
                                        player.savePctg !== undefined
                                          ? player.savePctg.toFixed(3).substring(1)
                                          : "N/A";
                                    } else if (col.key === "plusMinus") {
                                      const value = player[col.key as keyof PlayerStats];
                                      if (typeof value === "number" && value > 0) {
                                        cellValue = `+${value}`;
                                      } else {
                                        cellValue = value ?? "N/A";
                                      }
                                    } else {
                                      cellValue = player[col.key as keyof PlayerStats] ?? "N/A";
                                    }
                                    return (
                                      <td key={col.key} className="px-2 py-2 whitespace-nowrap">
                                        {cellValue}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
