import { useState } from "react";
import { formatTime } from "../../../utils/formatTime";

export function StartTimeToggle({ gameStartTime }: { gameStartTime: string }) {
  const [showLocalTime, setShowLocalTime] = useState(false);

  const startTime = new Date(gameStartTime);
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
