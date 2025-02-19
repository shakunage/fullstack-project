import type { GameItem } from "../../entities/GameItem";
import { formatTime } from "../../utils/formatTime";

export function EndedGame({ game }: { game: GameItem }) {
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
          Start Time: {
            formatTime(new Date(game.startTimeUTC), "America/New_York") 
          } ET
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
      </div>
    </>
  );
}
