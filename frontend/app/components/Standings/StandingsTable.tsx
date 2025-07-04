import { type StandingsItem } from "~/entities/StandingsItem";

export function StandingsTable({
  conferenceStandings,
  groupedStandings,
}: {
  conferenceStandings: any;
  groupedStandings: Record<string, Record<string, StandingsItem[]>>;
}) {
  return (
    <div key={conferenceStandings}>
      <h2 className="text-2xl font-semibold mb-4 text-center">{conferenceStandings} Conference</h2>
      {Object.entries(groupedStandings[conferenceStandings])
        // Sort divisions within conference (e.g., Atlantic, Metropolitan, Central, Pacific) - adjust as needed
        .sort(([divA], [divB]) => {
          const divisionOrder = ["Atlantic", "Metropolitan", "Central", "Pacific"];
          return divisionOrder.indexOf(divA) - divisionOrder.indexOf(divB);
        })
        .map(([divisionName, teams]) => (
          <div
            key={divisionName}
            className="mb-6 bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-800"
          >
            <h3 className="text-xl font-medium p-3 bg-gray-100 dark:bg-gray-700">
              {divisionName} Division
            </h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    GP
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    W
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    L
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    OT
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    Pts
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {teams.map((team, index) => (
                  <tr
                    key={team.teamAbbrev.default}
                    className={
                      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-750"
                    }
                  >
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {team.divisionSequence}
                      {team.clinchIndicator && (
                        <span className="ml-1 text-green-600 font-bold" title="Clinched Playoff Spot">
                          {team.clinchIndicator}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white flex items-center">
                      <img
                        src={team.teamLogo}
                        alt={`${team.teamName.default} logo`}
                        className="h-6 w-6 mr-2"
                      />
                      {team.teamName.default}
                    </td>
                    <td className="px-1 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                      {team.gamesPlayed}
                    </td>
                    <td className="px-1 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                      {team.wins}
                    </td>
                    <td className="px-1 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                      {team.losses}
                    </td>
                    <td className="px-1 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                      {team.otLosses}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white text-center">
                      {team.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
