import { useLoaderData, useNavigate } from "react-router";
import type { BoxscoreData } from "~/entities";
import { boxscoreLoader } from "~/loaders/boxscoreLoader";

export const loader = boxscoreLoader;

export default function Game() {
  const data: BoxscoreData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  
  return (
    <main className="flex flex-col items-center pt-16 pb-4 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={goBack}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 flex items-center"
          aria-label="Go back"
        >
          <span className="mr-2 text-2xl" aria-hidden="true">&larr;</span>
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
              <img src={data.awayTeam.logo} alt={`${data.awayTeam.commonName.default} logo`} className="h-16 w-16 mr-4" />
              <div>
                <h2 className="text-2xl font-bold">{data.awayTeam.commonName.default}</h2>
                {data.awayTeam.placeName && <p className="text-lg">({data.awayTeam.placeName.default})</p>}
              </div>
            </div>
            {/* Score & Status */}
            <div className="text-center">
              <p className="text-4xl font-bold">{data.awayTeam.score} - {data.homeTeam.score}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {data.gameState === "OFF" ? "Final" : data.gameState === "LIVE" ? "Live" : data.gameScheduleState || "Scheduled"}
                {data.clock && data.clock.inIntermission && !data.clock.running && " (Intermission)"}
              </p>
            </div>
            {/* Home Team */}
            <div className="flex items-center text-right">
              <div className="mr-4">
                <h2 className="text-2xl font-bold">{data.homeTeam.commonName.default}</h2>
                {data.homeTeam.placeName && <p className="text-lg">({data.homeTeam.placeName.default})</p>}
              </div>
              <img src={data.homeTeam.logo} alt={`${data.homeTeam.commonName.default} logo`} className="h-16 w-16" />
            </div>
          </div>

          {/* Game Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Game Information</h3>
              {data.venue && data.venue.default && <p><span className="font-semibold">Venue:</span> {data.venue.default}</p>}
              <p><span className="font-semibold">Status:</span> {data.gameState === "OFF" ? "Final" : data.gameState === "LIVE" ? "Live" : data.gameScheduleState || "Scheduled"}</p>
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
          
          {/* Player Stats */}
          {data.playerByGameStats && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">Player Statistics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                {/* Away Team Players */}
                {data.playerByGameStats.awayTeam && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-center">{data.awayTeam.commonName.default}</h3>
                    {['forwards', 'defense', 'goalies'].map(positionKey => {
                      const players = data.playerByGameStats.awayTeam[positionKey as keyof typeof data.playerByGameStats.awayTeam];
                      if (!players || players.length === 0) return <p key={positionKey} className="my-2">No {positionKey} data available for {data.awayTeam.commonName.default}.</p>;
                      return (
                        <div key={positionKey} className="w-full mb-4">
                          <h4 className="text-lg font-semibold mb-2 capitalize">{positionKey}</h4>
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">G</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">A</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">P</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">+/-</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PIM</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SOG</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">TOI</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                              {players.map((player) => (
                                <tr key={player.playerId}>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.sweaterNumber}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.name.default}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.goals}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.assists}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.points}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.plusMinus}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.pim}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.sog}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.toi}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Home Team Players */}
                {data.playerByGameStats.homeTeam && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-center">{data.homeTeam.commonName.default}</h3>
                    {['forwards', 'defense', 'goalies'].map(positionKey => {
                      const players = data.playerByGameStats.homeTeam[positionKey as keyof typeof data.playerByGameStats.homeTeam];
                      if (!players || players.length === 0) return <p key={positionKey} className="my-2">No {positionKey} data available for {data.homeTeam.commonName.default}.</p>;
                      return (
                        <div key={positionKey} className="w-full mb-4">
                          <h4 className="text-lg font-semibold mb-2 capitalize">{positionKey}</h4>
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">G</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">A</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">P</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">+/-</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PIM</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SOG</th>
                                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">TOI</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                              {players.map((player) => (
                                <tr key={player.playerId}>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.sweaterNumber}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.name.default}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.goals}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.assists}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.points}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.plusMinus}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.pim}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.sog}</td>
                                  <td className="px-2 py-2 whitespace-nowrap">{player.toi}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
