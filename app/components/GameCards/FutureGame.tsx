import { useEffect, useState } from "react";
import { calculateTimeUntilStart } from "../../utils/calculateTimeUntilStart";
import type { GameItem } from "../../entities/GameItem";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { Venue } from "./subcomponents/Venue";

export function FutureGame({ game }: { game: GameItem }) {
  const [timeUntilStart, setTimeUntilStart] = useState<string | undefined>("");

  useEffect(() => {
    const updateTimeUntilStart = () => {
      const timeUntilStart = calculateTimeUntilStart(game.startTimeUTC);
      setTimeUntilStart(timeUntilStart);
    };

    updateTimeUntilStart(); // Initial call to set the time immediately

    const interval = setInterval(updateTimeUntilStart, 60000);
    return () => clearInterval(interval); // Cleanup interval on component unmount to avoid memory leaks
  }, []);

  return (
    <>
      <div key={game.id} className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">
          {game.homeTeam.name.default} vs. {game.awayTeam.name.default}
        </h2>
        <div className="flex items-center text-gray-700">
          <StartTimeToggle game={game} />
        </div>
        <p className="text-gray-700">Time until start time: {timeUntilStart}</p>
        <Venue game={game} />
      </div>
    </>
  );
}
