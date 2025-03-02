import { useState } from "react";
import type { GameItem } from "../../entities/GameItem";
import { formatTime } from "../../utils/formatTime";

export function GameHeader({ game }: { game: GameItem }) {
  const [showLocalTime, setShowLocalTime] = useState(false);

  const startTime = new Date(game.startTimeUTC);
  const easternTime = `${formatTime(startTime, "America/New_York")} ET`;
  const localTime = formatTime(startTime, Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <>
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
      <span>Start Time: {showLocalTime ? localTime : easternTime}</span>
      <button
        onClick={() => setShowLocalTime(!showLocalTime)}
        className="ml-2 p-1 bg-blue-500 text-white rounded text-xs"
      >
        Show {showLocalTime ? "Eastern Time" : "User Time"}
      </button>
      <p className="text-gray-700">Venue: {game.venue.default}</p>
    </>
  );
}
