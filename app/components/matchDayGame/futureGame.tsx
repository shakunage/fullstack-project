import { useEffect, useState } from "react";
import type { GameItem } from "../../entities/GameItem";

export function FutureGame({ game }: { game: GameItem }) {
  const [timeUntilStart, setTimeUntilStart] = useState("");

  useEffect(() => {
    const calculateTimeUntilStart = () => {
      const now = new Date();
      const startTime = new Date(game.startTimeUTC);
      const diff = startTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeUntilStart("Game has started");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeUntilStart(`${days} days ${hours} hours ${minutes} minutes`);
    };

    calculateTimeUntilStart();
    const interval = setInterval(calculateTimeUntilStart, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [game.startTimeUTC]);
  return (
    <>
      <div key={game.id} className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">
          {game.homeTeam.name.default} vs. {game.awayTeam.name.default}
        </h2>
        <p className="text-gray-700">Start Time: {new Date(game.startTimeUTC).toLocaleString()}</p>
        <p className="text-gray-700">Time until start time: {timeUntilStart}</p>
        <p className="text-gray-700">Venue: {game.venue.default}</p>
      </div>
    </>
  );
}
