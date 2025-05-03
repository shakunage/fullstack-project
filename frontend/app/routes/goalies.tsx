import { useLoaderData } from "react-router";
import { topgoaliesLoader } from "../loaders/topgoaliesLoader";
import { type TopGoalies, type GoalieStat } from "../entities/TopGoalies"; // Import GoalieStat

export const loader = topgoaliesLoader;

export default function Goalies() {
  const data: TopGoalies = useLoaderData<typeof loader>();

  if (!data) {
    return <div className="text-center text-red-500 mt-10">Error loading goalies data.</div>;
  }

  // Helper function to render a single goalie table
  const renderGoalieTable = (title: string, goalies: GoalieStat[], statKey: keyof TopGoalies) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{title}</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rank
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Player
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Team
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {statKey === "savePctg"
                  ? "Save %"
                  : statKey === "goalsAgainstAverage"
                    ? "GAA"
                    : statKey.charAt(0).toUpperCase() + statKey.slice(1)}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {goalies.map((goalie, index) => (
              <tr key={goalie.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={goalie.headshot}
                        alt={`${goalie.firstName.default} ${goalie.lastName.default}`}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {goalie.firstName.default} {goalie.lastName.default}
                      </div>
                      <div className="text-sm text-gray-500">
                        #{goalie.sweaterNumber} | {goalie.position}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-8 w-8 mr-2" src={goalie.teamLogo} alt={goalie.teamName.default} />
                    <span className="text-sm text-gray-900">{goalie.teamAbbrev}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700 font-semibold">
                  {statKey === "savePctg"
                    ? goalie.value.toFixed(3)
                    : statKey === "goalsAgainstAverage"
                      ? goalie.value.toFixed(2)
                      : goalie.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 pt-20 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-900">Top NHL Goalies</h1>
      {renderGoalieTable("Top Goalies by Wins", data.wins, "wins")}
      {renderGoalieTable("Top Goalies by Shutouts", data.shutouts, "shutouts")}
      {renderGoalieTable("Top Goalies by Save Percentage", data.savePctg, "savePctg")}
      {renderGoalieTable(
        "Top Goalies by Goals Against Average",
        data.goalsAgainstAverage,
        "goalsAgainstAverage"
      )}
    </div>
  );
}
