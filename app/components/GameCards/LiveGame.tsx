import type { GameItem } from "../../entities/GameItem";
import { Venue } from "./subcomponents/Venue";
import { GameDetailsButton } from "./subcomponents/GameDetailsButton";

export function LiveGame({ game }: { game: GameItem }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">
        {game.homeTeam.name.default} vs. {game.awayTeam.name.default}
      </h2>
      <p className="text-gray-700">
        Live score: {game.homeTeam.score} - {game.awayTeam.score} (Period {game.period})
      </p>
      <Venue 
        venue={game.venue.default} 
        homeTeamAbbrev={game.homeTeam.abbrev} 
      />
      <GameDetailsButton game={game} />
    </div>
  );
}
