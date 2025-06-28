import { useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { standingsLoader } from "~/loaders/standingsLoader";
import { type StandingsItem } from "~/entities/StandingsItem";
import moment from "moment-timezone";
import DatePickerComponent from "~/components/DatePicker";
import isValidDate from "~/utils/isValidDate";
import { useMemo } from "react";

export const loader = standingsLoader;


export default function Standings({ params }: LoaderFunctionArgs) {
  const data: StandingsItem[] = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // Group standings by conference and then by division
  const groupedStandings = useMemo(() => {
    if (!data) return {};
    return data.reduce(
      (acc, team) => {
        const { conferenceName, divisionName } = team;
        if (!acc[conferenceName]) {
          acc[conferenceName] = {};
        }
        if (!acc[conferenceName][divisionName]) {
          acc[conferenceName][divisionName] = [];
        }
        // Sort teams within division by divisionSequence
        acc[conferenceName][divisionName].push(team);
        acc[conferenceName][divisionName].sort((a, b) => a.divisionSequence - b.divisionSequence);
        return acc;
      },
      {} as Record<string, Record<string, StandingsItem[]>>
    );
  }, [data]);

  const [selectedDate, setSelectedDate] = useState<Date>(
      params.date && isValidDate(params.date)
        ? new Date(params.date)
        : moment().tz("America/Los_Angeles").startOf("day").toDate()
    );
  
  const handleDateChange = (date: Date | string | null): void => {
    if (date) {
      const pacificDate: Date = moment(date)
        .tz("America/Los_Angeles")
        .toDate();
      setSelectedDate(pacificDate);
      const formattedDate: string = moment(pacificDate).format("YYYY-MM-DD");
      void navigate(`/standings/${formattedDate}`);
    }
  };

  if (!data || data.length === 0) {
    const date = params.date || "unknown date";
    return (
      <main className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold text-center mb-4">NHL Standings</h1>
        <DatePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
        <div className="pt-16 text-center mb-15">
          <p className="text-lg mb-4">Standings data not found for {date}.</p>
          <button
            onClick={() => navigate("/standings")}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Click here to return to latest standings
          </button>
        </div>
      </main>
    );
  }
  
  // Sort conferences: Eastern first, then Western (adjust if names differ)
  const conferenceOrder = ["Eastern", "Western"];
  const sortedConferences = Object.keys(groupedStandings).sort((a, b) => {
    return conferenceOrder.indexOf(a) - conferenceOrder.indexOf(b);
  });

  return (
    <main className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold text-center mb-4">NHL Standings</h1>
      <DatePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
      <div className="relative w-full">
                {isLoading ? (
                  <div className="mb-50 mt-5">
                    <div className="spinner border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin absolute top-[-2rem] left-1/2 transform -translate-x-1/2"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedConferences.map((conferenceName) => (
          <div key={conferenceName}>
            <h2 className="text-2xl font-semibold mb-4 text-center">{conferenceName} Conference</h2>
            {Object.entries(groupedStandings[conferenceName])
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
                              <span
                                className="ml-1 text-green-600 font-bold"
                                title="Clinched Playoff Spot"
                              >
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
        ))}
      </div>
                )}
              </div>
    </main>
  );
}
