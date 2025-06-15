import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { bettingLinesLoader } from "../loaders/bettingLinesLoader";
import {
  type BettingLinesData,
  type Game,
  type Team,
  type Odds,
  type BettingPartner,
} from "../entities/BettingLines"; // Import necessary types

export const loader = bettingLinesLoader;

export default function BettingLines({ params }: LoaderFunctionArgs) {
  // Renamed component for clarity
  const data = useLoaderData<typeof loader>() as BettingLinesData; // Cast data type

  if (!data) {
    return <div className="text-center text-red-500 mt-10 pt-20">Error loading betting lines data.</div>;
  }

  // Helper to format time using moment-timezone
  const formatTime = (utcTime: string) => {
    // Guess user's timezone and format
    return moment(utcTime).tz(moment.tz.guess()).format("MMM D, YYYY h:mm A z");
  };

  // Helper function to format odd descriptions
  const formatOddDescription = (description: string): string => {
    const map: { [key: string]: string } = {
      MONEY_LINE_3_WAY: "Money Line (3-Way)",
      MONEY_LINE: "Money Line",
      TOTAL_GOALS_OVER_UNDER: "Total Goals (O/U)",
      SPREAD: "Spread",
      // Add more mappings as needed based on observed data
    };
    // Replace underscores with spaces and title case for fallback
    const fallback = description
      .replace(/_/g, " ")
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    return map[description] || fallback;
  };

  // Helper to render odds for a team
  const renderOdds = (odds: Odds[]) => (
    <ul className="mt-2 space-y-1 text-xs text-gray-600 w-full">
      {odds.map((odd, index) => (
        <li key={index} className="flex justify-between border-t border-gray-100 pt-1">
          <span
            className="truncate pr-1"
            title={`${formatOddDescription(odd.description)} (${odd.qualifier})`}
          >
            {formatOddDescription(odd.description)} ({odd.qualifier}):
          </span>
          <span className="font-semibold flex-shrink-0">
            {odd.value > 0 ? `+${odd.value}` : odd.value}
          </span>
        </li>
      ))}
    </ul>
  );

  // Helper to render a team section within a game card
  const renderTeamSection = (team: Team) => (
    <div className="flex flex-col items-center text-center w-1/2 px-2">
      <img src={team.logo} alt={team.name.default} className="w-16 h-16 mb-2 object-contain" />
      <p className="text-base font-semibold text-gray-800 leading-tight">{team.name.default}</p>
      <p className="text-sm text-gray-500 mb-2">{team.abbrev}</p>
      {renderOdds(team.odds)}
    </div>
  );

  // Helper to render the betting partner section
  const renderBettingPartner = (partner: BettingPartner) => (
    <section
      className="mb-8 p-4 rounded-lg shadow-lg flex items-center justify-between"
      style={{ backgroundColor: partner.bgColor || "#ffffff", color: partner.textColor || "#000000" }}
    >
      <div className="flex items-center">
        <img
          src={partner.imageUrl}
          alt={partner.name}
          className="w-10 h-10 mr-3 rounded object-contain"
        />
        <div>
          <h2 className="text-xl font-bold">{partner.name}</h2>
          <p className="text-xs opacity-90">{partner.country}</p>
        </div>
      </div>
      <a
        href={partner.siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded text-sm font-semibold transition duration-200 hover:opacity-80"
        style={{
          backgroundColor: partner.accentColor || partner.textColor || "#007bff", // Default accent blue
          color: partner.bgColor || "#ffffff",
          border: `1px solid ${partner.accentColor || partner.textColor || "#007bff"}`,
        }}
      >
        Visit Site
      </a>
    </section>
  );

  return (
    <main className="container mx-auto px-4 py-8 pt-20 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-4 text-blue-900">NHL Betting Lines</h1>
      <p className="text-center text-xs text-gray-500 mb-1">
        Odds as of: {formatTime(data.lastUpdatedUTC)}
      </p>
      <p className="text-center text-xs text-gray-500 mb-6">
        Current Odds Date: {moment(data.currentOddsDate).format("MMMM D, YYYY")}
      </p>

      {renderBettingPartner(data.bettingPartner)}

      <section>
        <h2 className="text-xl font-bold text-center mb-5 text-gray-700">Upcoming Games & Odds</h2>
        {/* Changed lg:grid-cols-3 to lg:grid-cols-2 for wider cards on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {data.games.map((game: Game) => (
            <div
              key={game.gameId}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              <p className="text-xs text-center text-gray-500 mb-3 font-medium">
                {formatTime(game.startTimeUTC)}
              </p>
              <div className="flex justify-around items-start flex-grow mb-3">
                {renderTeamSection(game.awayTeam)}
                <div className="flex flex-col items-center justify-center pt-10">
                  <span className="text-gray-400 font-bold text-lg">vs</span>
                </div>
                {renderTeamSection(game.homeTeam)}
              </div>
              <p className="text-xs text-center text-gray-400 mt-auto pt-2 border-t border-gray-100">
                Game ID: {game.gameId}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
