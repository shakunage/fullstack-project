import { useState } from "react";
import type { GameItem } from "../../../entities/GameItem";
import { formatTime } from "../../../utils/formatTime";

export function StartTimeToggle({ game }: { game: GameItem }) {
  const [showLocalTime, setShowLocalTime] = useState(false);

  const startTime = new Date(game.startTimeUTC);
  const easternTime = `${formatTime(startTime, "America/New_York")} ET`;
  const localTime = formatTime(startTime, Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <>
      <span>Start Time: {showLocalTime ? localTime : easternTime}</span>
      <button
        onClick={() => setShowLocalTime(!showLocalTime)}
        className="ml-2 p-1 bg-blue-500 text-white rounded text-[10px]"
      >
        Show {showLocalTime ? "Eastern Time" : "User Time"}
      </button>
    </>
  );
}
