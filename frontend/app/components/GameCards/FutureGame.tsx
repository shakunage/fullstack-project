import { useQuery } from "@tanstack/react-query";
import { calculateTimeUntilStart } from "../../utils/calculateTimeUntilStart";
import type { GameItem } from "../../entities/GameItem";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { Venue } from "./subcomponents/Venue";
import type { BoxscoreData } from "../../entities/Boxscore";

export function FutureGame({ game }: { game: GameItem  | BoxscoreData }) {
  const { data: timeUntilStart } = useQuery({
    queryKey: ["timeUntilStart", game.startTimeUTC],
    queryFn: () => calculateTimeUntilStart(game.startTimeUTC),
    refetchInterval: 60000, // Refetch every minute
    refetchOnWindowFocus: false,
  });

  return (
    <div className="shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">
        {game.homeTeam.name.default} vs. {game.awayTeam.name.default}
      </h2>
      <div className="flex items-center text-gray-700">
        <StartTimeToggle gameStartTime={game.startTimeUTC} />
      </div>
      <p className="text-gray-700">Time until start: {timeUntilStart}</p>
      <Venue venue={game.venue.default} homeTeamAbbrev={game.homeTeam.abbrev} />
    </div>
  );
}
