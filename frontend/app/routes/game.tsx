import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import type { BoxscoreData, PlayerStats } from "~/entities"; // Import PlayerStats
import { boxscoreLoader } from "~/loaders/boxscoreLoader";

export const loader = boxscoreLoader;

// Column definitions
const skaterColumns = [
  { label: "#", key: "sweaterNumber", sortable: true },
  { label: "Name", key: "name", sortable: true },
  { label: "G", key: "goals", sortable: true },
  { label: "A", key: "assists", sortable: true },
  { label: "P", key: "points", sortable: true },
  { label: "+/-", key: "plusMinus", sortable: true },
  { label: "PIM", key: "pim", sortable: true },
  { label: "SOG", key: "sog", sortable: true },
  { label: "TOI", key: "toi", sortable: true },
];

const goalieColumns = [
  { label: "#", key: "sweaterNumber", sortable: true },
  { label: "Name", key: "name", sortable: true },
  { label: "SA", key: "shotsAgainst", sortable: true },
  { label: "SV", key: "saves", sortable: true },
  { label: "SV%", key: "savePctg", sortable: true },
  { label: "TOI", key: "toi", sortable: true },
];

export default function Game() {
  const data: BoxscoreData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [showPlayerStats, setShowPlayerStats] = useState(false);
  const [sortConfig, setSortConfig] = useState<
    Record<string, { key: string; direction: "ascending" | "descending" }>
  >({});

  const toiToSeconds = (toi: string | undefined): number => {
    if (!toi || !toi.includes(":")) return 0;
    const [minutes, seconds] = toi.split(":").map(Number);
    return minutes * 60 + seconds;
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
      {!data ? (
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
                src={data.awayTeam.logo}
                alt={`${data.awayTeam.commonName.default} logo`}
                className="h-16 w-16 mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold">{data.awayTeam.commonName.default}</h2>
                {data.awayTeam.placeName && (
                  <p className="text-lg">({data.awayTeam.placeName.default})</p>
                )}
              </div>
            </div>
            {/* Score & Status */}
            <div className="text-center">
              <p className="text-4xl font-bold">
                {data.awayTeam.score} - {data.homeTeam.score}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {data.gameState === "OFF"
                  ? "Final"
                  : data.gameState === "LIVE"
                    ? "Live"
                    : data.gameScheduleState || "Scheduled"}
                {data.clock && data.clock.inIntermission && !data.clock.running && " (Intermission)"}
              </p>
            </div>
            {/* Home Team */}
            <div className="flex items-center text-right">
              <div className="mr-4">
                <h2 className="text-2xl font-bold">{data.homeTeam.commonName.default}</h2>
                {data.homeTeam.placeName && (
                  <p className="text-lg">({data.homeTeam.placeName.default})</p>
                )}
              </div>
              <img
                src={data.homeTeam.logo}
                alt={`${data.homeTeam.commonName.default} logo`}
                className="h-16 w-16"
              />
            </div>
          </div>

          {/* Game Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Game Information</h3>
              {data.venue && data.venue.default && (
                <p>
                  <span className="font-semibold">Venue:</span> {data.venue.default}
                </p>
              )}
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {data.gameState === "OFF"
                  ? "Final"
                  : data.gameState === "LIVE"
                    ? "Live"
                    : data.gameScheduleState || "Scheduled"}
              </p>
            </div>
          </div>

          {/* Team Stats Comparison */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-center">Team Stats</h3>
            <div className="flex justify-around items-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <div>
                <p className="text-lg font-semibold">{data.awayTeam.abbrev}</p>
                <p className="text-2xl">{data.awayTeam.sog}</p>
                <p className="text-sm">Shots on Goal</p>
              </div>
              <div className="text-gray-400 dark:text-gray-500">vs</div>
              <div>
                <p className="text-lg font-semibold">{data.homeTeam.abbrev}</p>
                <p className="text-2xl">{data.homeTeam.sog}</p>
                <p className="text-sm">Shots on Goal</p>
              </div>
            </div>
          </div>

          {/* Player Stats Toggle */}
          {data.playerByGameStats && (
            <div className="w-full mt-6">
              <button
                onClick={() => setShowPlayerStats(!showPlayerStats)}
                className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-xl font-semibold focus:outline-none"
              >
                Player Statistics {showPlayerStats ? "▲" : "▼"}
              </button>
            </div>
          )}

          {/* Player Stats Content (Conditional Rendering) */}
          {data.playerByGameStats && showPlayerStats && (
            <div className="mt-4">
              {" "}
              {/* Removed text-2xl font-bold mb-4 text-center from h3 as it's now in button */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                {/* Team Stats Rendering Logic */}
                {(["awayTeam", "homeTeam"] as const).map((teamType) => {
                  const teamData = data.playerByGameStats[teamType];
                  const teamDetails = data[teamType];
                  if (!teamData) return null;

                  return (
                    <div key={teamType}>
                      <h3 className="text-xl font-semibold mb-3 text-center">
                        {teamDetails.commonName.default}
                      </h3>
                      {(["forwards", "defense", "goalies"] as const).map((positionKey) => {
                        const players: PlayerStats[] =
                          teamData[positionKey as keyof typeof teamData] || [];
                        if (players.length === 0) {
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
                        const currentColumns = positionKey === "goalies" ? goalieColumns : skaterColumns;

                        let processedPlayers = [...players];
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
