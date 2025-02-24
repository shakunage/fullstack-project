import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import { boxscoreLoader } from "../../data/boxscoreLoader";
import type { GameItem, BoxscoreData } from "../../entities";
import { formatTime } from "../../utils/formatTime";

export const loader = boxscoreLoader;

export function EndedGame({ game }: { game: GameItem }) {
  const [showDetails, setShowDetails] = useState(false);
  const [boxscoreData, setBoxscoreData] = useState<BoxscoreData>({} as BoxscoreData);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) {
      setBoxscoreData(fetcher.data as BoxscoreData);
      setShowDetails(true);
    }
  }, [fetcher.data]);

  const handleToggleDetails = async (): Promise<void> => {
    if (!showDetails) {
      await fetcher.load(`/games/${game.gameDate}/${game.id}`);
    } else {
      setShowDetails(false);
    }
  };

  return (
    <>
      <div key={game.id} className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">
          {game.homeTeam.name.default} vs. {game.awayTeam.name.default}
        </h2>
        <p className="text-gray-700">
          Score: {game.homeTeam.score} - {game.awayTeam.score}
          {game.gameOutcome.lastPeriodType === "REG"
            ? " (Final)"
            : game.gameOutcome.lastPeriodType === "OT"
              ? " (Final - OT)"
              : game.gameOutcome.lastPeriodType === "SO"
                ? " (Final - SO)"
                : "(Unknown)"}
        </p>
        <p className="text-gray-700">
          Start Time: {formatTime(new Date(game.startTimeUTC), "America/New_York")} ET
        </p>
        <p className="text-gray-700">Venue: {game.venue.default}</p>
        <p className="text-gray-700 flex items-center">
          Watch Quick Recap (3 min)
          <a
            href={`https://www.nhl.com${game.threeMinRecap}`}
            className="text-blue-500 hover:underline flex items-center ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4.5 3.5a1 1 0 011.5-.87l10 5.5a1 1 0 010 1.74l-10 5.5A1 1 0 014.5 14.5v-11z" />
            </svg>
          </a>
        </p>
        <p className="text-gray-700 flex items-center">
          Watch Condensed Game (10 min)
          <a
            href={`https://www.nhl.com${game.condensedGame}`}
            className="text-blue-500 hover:underline flex items-center ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4.5 3.5a1 1 0 011.5-.87l10 5.5a1 1 0 010 1.74l-10 5.5A1 1 0 014.5 14.5v-11z" />
            </svg>
          </a>
        </p>
        <button
          onClick={() => {
            void handleToggleDetails();
          }}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded text-center"
        >
          {showDetails ? "Hide Details" : "Show Goal Scorers and Goalies"}
        </button>
        {showDetails && boxscoreData && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Goal Scorers</h3>
            <div>
              <h4 className="font-semibold">Home Team</h4>
              {game.goals
                .filter((goal) => goal.teamAbbrev === game.homeTeam.abbrev)
                .map((goal) => (
                  <p key={`${goal.period}_${goal.timeInPeriod}`}>
                    {goal.name.default} - {goal.goalsToDate} goals
                  </p>
                ))}
            </div>
            <div>
              <h4 className="font-semibold">Away Team</h4>
              {game.goals
                .filter((goal) => goal.teamAbbrev === game.awayTeam.abbrev)
                .map((goal) => (
                  <p key={`${goal.period}_${goal.timeInPeriod}`}>
                    {goal.name.default} - {goal.goalsToDate} goals
                  </p>
                ))}
            </div>
            <h3 className="text-lg font-bold mt-4">Goalies</h3>
            <div>
              <h4 className="font-semibold">Home Team</h4>
              {boxscoreData.playerByGameStats.homeTeam.goalies.map((goalie) => (
                <>
                  {goalie.toi === "00:00" ? (
                    <div key={goalie.playerId}></div>
                  ) : (
                    <p key={goalie.playerId}>
                      {goalie.name.default} - {goalie.saveShotsAgainst} saves
                    </p>
                  )}
                </>
              ))}
            </div>
            <div>
              <h4 className="font-semibold">Away Team</h4>
              {boxscoreData.playerByGameStats.awayTeam.goalies.map((goalie) => (
                <>
                  {goalie.toi === "00:00" ? (
                    <div key={goalie.playerId}></div>
                  ) : (
                    <p key={goalie.playerId}>
                      {goalie.name.default} - {goalie.saveShotsAgainst} saves
                    </p>
                  )}
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
