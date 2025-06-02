import { useLoaderData, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { BoxscoreData, PlayerStats, GameLandingData } from "~/entities";
import { gameLandingLoader } from "~/loaders/gameLandingLoader";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import { skaterBoxscoreConstants, goalieBoxscoreConstants } from "~/constants/boxscoreConstants";
import { toiToSeconds } from "~/utils/toiToSeconds";

export const loader = gameLandingLoader;

export default function Game() {
  const initialGameData = useLoaderData<typeof loader>() as GameLandingData;
  const navigate = useNavigate();
  const params = useParams();
  const gameId = Number(params.gameId); // Assuming gameId is part of the route params for fetching

  const goBack = () => navigate(-1);

  const [showPlayerStats, setShowPlayerStats] = useState(false);
  const [boxscoreDetails, setBoxscoreDetails] = useState<BoxscoreData | null>(null);
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
      if (!initialGameData?.gameDate || !initialGameData?.id) {
        throw new Error("Game date or ID is missing for fetching boxscore.");
      }
      return fetchBoxscore(initialGameData.gameDate, initialGameData.id);
    },
    enabled: false,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (fetchedBoxscoreData) {
      setBoxscoreDetails(fetchedBoxscoreData);
    }
  }, [fetchedBoxscoreData]);

  const handleTogglePlayerStats = async () => {
    if (!showPlayerStats && !boxscoreDetails && !isFetchingBoxscore) {
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
    <main className="flex flex-col items-center pt-16 pb-4 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={goBack}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 flex items-center"
          aria-label="Go back"
        >
          <span className="mr-2 text-2xl" aria-hidden="true">
            &larr;
          </span>
        </button>
      </div>
      {!initialGameData ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl">Loading game data or game not found...</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
          {/* Game Header: Teams & Score */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            {/* Away Team */}
            <div className="flex items-center">
              <img
                src={initialGameData.awayTeam.logo}
                alt={`${initialGameData.awayTeam.commonName.default} logo`}
                className="h-16 w-16 mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold">{initialGameData.awayTeam.commonName.default}</h2>
                {initialGameData.awayTeam.placeName && (
                  <p className="text-lg">({initialGameData.awayTeam.placeName.default})</p>
                )}
              </div>
            </div>
            {/* Score & Status */}
            <div className="text-center">
              <p className="text-4xl font-bold">
                {initialGameData.awayTeam.score} - {initialGameData.homeTeam.score}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {initialGameData.gameState === "OFF"
                  ? "Final"
                  : initialGameData.gameState === "LIVE"
                    ? "Live"
                    : initialGameData.gameScheduleState || "Scheduled"}
                {initialGameData.clock &&
                  initialGameData.clock.inIntermission &&
                  !initialGameData.clock.running &&
                  " (Intermission)"}
              </p>
            </div>
            {/* Home Team */}
            <div className="flex items-center text-right">
              <div className="mr-4">
                <h2 className="text-2xl font-bold">{initialGameData.homeTeam.commonName.default}</h2>
                {initialGameData.homeTeam.placeName && (
                  <p className="text-lg">({initialGameData.homeTeam.placeName.default})</p>
                )}
              </div>
              <img
                src={initialGameData.homeTeam.logo}
                alt={`${initialGameData.homeTeam.commonName.default} logo`}
                className="h-16 w-16"
              />
            </div>
          </div>

          {/* Game Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">Game Details</h3>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(initialGameData.gameDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="font-semibold">Start Time:</span>{" "}
                {new Date(initialGameData.startTimeUTC).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </p>
              {initialGameData.venue && initialGameData.venue.default && (
                <p>
                  <span className="font-semibold">Venue:</span> {initialGameData.venue.default}
                  {initialGameData.venueLocation?.default && (
                    <span className="text-gray-600 dark:text-gray-400">
                      {" "}
                      ({initialGameData.venueLocation.default})
                    </span>
                  )}
                </p>
              )}
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {initialGameData.gameState === "OFF"
                  ? "Final"
                  : initialGameData.gameState === "LIVE"
                    ? "Live"
                    : initialGameData.gameScheduleState || "Scheduled"}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">Broadcast Information</h3>
              {initialGameData.tvBroadcasts && initialGameData.tvBroadcasts.length > 0 ? (
                <ul className="list-disc list-inside">
                  {initialGameData.tvBroadcasts.map((broadcast) => (
                    <li key={broadcast.id}>
                      {broadcast.network} ({broadcast.market}, {broadcast.countryCode})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No broadcast information available.</p>
              )}
            </div>
          </div>

          {/* Scoring Summary */}
          {initialGameData.summary?.scoring && initialGameData.summary.scoring.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Scoring Summary</h3>
              {initialGameData.summary.scoring.map((period) => (
                <div key={period.periodDescriptor.number} className="mb-4">
                  <h4 className="text-xl font-semibold mb-2">
                    Period {period.periodDescriptor.number}
                    {period.periodDescriptor.periodType !== "REG" &&
                      ` (${period.periodDescriptor.periodType})`}
                  </h4>
                  {period.goals.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {period.goals.map((goal) => (
                        <li key={goal.eventId} className="py-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <img
                                src={
                                  goal.teamAbbrev.default === initialGameData.homeTeam.abbrev
                                    ? initialGameData.homeTeam.logo
                                    : initialGameData.awayTeam.logo
                                }
                                alt={`${goal.teamAbbrev.default} logo`}
                                className="h-8 w-8 mr-3"
                              />
                              <div>
                                <p className="font-semibold">
                                  {goal.teamAbbrev.default} Goal: {goal.name.default} (
                                  {goal.goalsToDate})
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {goal.shotType} at {goal.timeInPeriod}
                                  {goal.strength !== "ev" && ` (${goal.strength.toUpperCase()})`}
                                  {goal.goalModifier !== "none" && ` (${goal.goalModifier})`}
                                </p>
                                {goal.assists.length > 0 && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Assists:{" "}
                                    {goal.assists
                                      .map((assist) => `${assist.name.default} (${assist.assistsToDate})`)
                                      .join(", ")}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-lg font-bold">
                              {goal.awayScore} - {goal.homeScore}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No goals in this period.</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Three Stars */}
          {initialGameData.summary?.threeStars && initialGameData.summary.threeStars.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Three Stars of the Game</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {initialGameData.summary.threeStars
                  .sort((a, b) => a.star - b.star)
                  .map((star) => (
                    <div
                      key={star.playerId}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow text-center"
                    >
                      <img
                        src={star.headshot}
                        alt={star.name.default}
                        className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                      />
                      <p className="text-lg font-semibold">
                        {star.star}
                        {star.star === 1 ? "st" : star.star === 2 ? "nd" : "rd"} Star
                      </p>
                      <p className="font-bold">{star.name.default}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {star.teamAbbrev} - {star.position}
                      </p>
                      <p className="text-sm">
                        {star.goals}G, {star.assists}A, {star.points}P
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
          
          {/* Penalties */}
          {initialGameData.summary?.penalties && initialGameData.summary.penalties.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Penalty Summary</h3>
              {initialGameData.summary.penalties.map((period) => (
                <div key={`penalty-${period.periodDescriptor.number}`} className="mb-4">
                  <h4 className="text-xl font-semibold mb-2">
                    Period {period.periodDescriptor.number}
                    {period.periodDescriptor.periodType !== "REG" &&
                      ` (${period.periodDescriptor.periodType})`}
                  </h4>
                  {period.penalties.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {period.penalties.map((penalty, index) => {
                        const committedBy = penalty.committedByPlayer
                          ? penalty.committedByPlayer.default
                          : "Bench";
                        const drawnByText = penalty.drawnBy
                          ? `Drawn by: ${penalty.drawnBy.default}`
                          : "";
                        const servedByText = penalty.servedBy
                          ? `Served by: ${penalty.servedBy.default}`
                          : "";

                        return (
                          <li key={`${penalty.descKey}-${index}`} className="py-2">
                            <p>
                              <span className="font-semibold">
                                {penalty.teamAbbrev.default} Penalty:
                              </span>{" "}
                              {committedBy} - {penalty.duration} mins for {penalty.type}
                              {penalty.servedBy && committedBy === "Bench" && (
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {" "}
                                  ({servedByText})
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              At {penalty.timeInPeriod}. {drawnByText}
                              {penalty.servedBy && committedBy !== "Bench" && (
                                <>
                                  {drawnByText ? ". " : ""}
                                  {servedByText}
                                </>
                              )}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No penalties in this period.</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Team Stats Comparison */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-center">Team Stats</h3>
            <div className="flex justify-around items-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <div>
                <p className="text-lg font-semibold">{initialGameData.awayTeam.abbrev}</p>
                <p className="text-2xl">{initialGameData.awayTeam.sog}</p>
                <p className="text-sm">Shots on Goal</p>
              </div>
              <div className="text-gray-400 dark:text-gray-500">vs</div>
              <div>
                <p className="text-lg font-semibold">{initialGameData.homeTeam.abbrev}</p>
                <p className="text-2xl">{initialGameData.homeTeam.sog}</p>
                <p className="text-sm">Shots on Goal</p>
              </div>
            </div>
          </div>

          {/* Player Stats Toggle */}
          {/* Always show button, disable if game state is not 'OFF' or 'LIVE' or if essential data is missing */}
          <div className="w-full mt-6">
            <button
              onClick={handleTogglePlayerStats}
              className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-xl font-semibold focus:outline-none disabled:opacity-50"
              disabled={
                isFetchingBoxscore ||
                !(
                  initialGameData.gameState === "OFF" ||
                  initialGameData.gameState === "LIVE" ||
                  initialGameData.gameState === "CRIT" // Assuming CRIT also allows stats
                ) ||
                !initialGameData.id // Ensure gameId is available
              }
            >
              Player Statistics {showPlayerStats ? "▲" : "▼"}
            </button>
          </div>

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
          {showPlayerStats && boxscoreDetails && !isFetchingBoxscore && (
            <div className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                {/* Team Stats Rendering Logic */}
                {(["awayTeam", "homeTeam"] as const).map((teamType) => {
                  // Use boxscoreDetails for player stats, and initialGameData for team names/logos if needed
                  const teamStatsData = boxscoreDetails.playerByGameStats?.[teamType];
                  const teamDisplayDetails = initialGameData[teamType]; // For logo, name etc.

                  if (!teamStatsData) return null;

                  return (
                    <div key={teamType}>
                      <h3 className="text-xl font-semibold mb-3 text-center">
                        {teamDisplayDetails.commonName.default}
                      </h3>
                      {(["forwards", "defense", "goalies"] as const).map((positionKey) => {
                        const playersAtPosition: PlayerStats[] =
                          teamStatsData[positionKey as keyof typeof teamStatsData] || [];
                        if (playersAtPosition.length === 0) {
                          return (
                            <p
                              key={positionKey}
                              className="my-2 text-sm text-gray-500 dark:text-gray-400"
                            >
                              No {positionKey} data available.
                            </p>
                          );
                        }

                        const tableId = `${teamType}-${positionKey}`;
                        const currentColumns = positionKey === "goalies" ? goalieBoxscoreConstants : skaterBoxscoreConstants;

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
                                          <span>
                                            {currentSort.direction === "ascending" ? " ▲" : " ▼"}
                                          </span>
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
                                          if (typeof value === 'number' && value > 0) {
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
        </div>
      )}
    </main>
  );
}
