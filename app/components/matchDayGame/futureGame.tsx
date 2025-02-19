import { useEffect, useState } from "react";
import { formatTime } from "../../utils/formatTime";
import { calculateTimeUntilStart } from "../../utils/calculateTimeUntilStart";
import type { GameItem } from "../../entities/GameItem";

export function FutureGame({ game }: { game: GameItem }) {
  const [timeUntilStart, setTimeUntilStart] = useState<string | undefined>("");
  const [showLocalTime, setShowLocalTime] = useState(false);

  useEffect(() => {
    const timeUntilStart = calculateTimeUntilStart(game.startTimeUTC);
    setTimeUntilStart(timeUntilStart);
  }, [game.startTimeUTC]);

  const startTime = new Date(game.startTimeUTC);
  const easternTime = formatTime(startTime, "America/New_York");
  const localTime = formatTime(startTime, Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <>
      <div key={game.id} className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">
          {game.homeTeam.name.default} vs. {game.awayTeam.name.default}
        </h2>
        <div className="flex items-center text-gray-700">
          <span>
            Start Time: {showLocalTime ? localTime : easternTime}
          </span>
          <button
            onClick={() => setShowLocalTime(!showLocalTime)}
            className="ml-2 p-1 bg-blue-500 text-white rounded text-xs"
          >
            Show {showLocalTime ? "Eastern Time" : "User Time"}
          </button>
        </div>
        <p className="text-gray-700">Time until start time: {timeUntilStart}</p>
        <p className="text-gray-700">Venue: {game.venue.default}</p>
      </div>
    </>
  );
}
