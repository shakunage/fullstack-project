import { GameDetailsButton } from "./subcomponents/GameDetailsButton";
import { boxscoreLoader } from "../../data/boxscoreLoader";
import type { GameItem } from "../../entities";
import { EndedGameHeader } from "./subcomponents/EndedGameHeader";
import { EndedGameDetails } from "./subcomponents/EndedGameDetails";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { Venue } from "./subcomponents/Venue";

export const loader = boxscoreLoader;

export function EndedGame({ game }: { game: GameItem }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <EndedGameHeader 
        lastPeriod={game.gameOutcome.lastPeriodType}
        homeTeam={game.homeTeam}
        awayTeam={game.awayTeam}
      />
      <StartTimeToggle gameStartTime={game.startTimeUTC} />
      <Venue 
        venue={game.venue.default} 
        homeTeamAbbrev={game.homeTeam.abbrev} 
      />
      <EndedGameDetails 
        threeMinRecapLink={game.threeMinRecap}
        condensedGameLink={game.condensedGame}
      />
      <GameDetailsButton game={game} />
    </div>
  );
}
