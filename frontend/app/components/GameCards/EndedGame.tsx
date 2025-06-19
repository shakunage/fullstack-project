import { FavoriteButton } from "./subcomponents/FavoriteButton";
import { GameDetailsButton } from "./subcomponents/GameDetailsButton";
import { boxscoreLoader } from "../../loaders/boxscoreLoader";
import type { GameItem } from "../../entities";
import type { BoxscoreData } from "../../entities/Boxscore";
import { EndedGameHeader } from "./subcomponents/EndedGameHeader";
import { EndedGameDetails } from "./subcomponents/EndedGameDetails";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { Venue } from "./subcomponents/Venue";

export const loader = boxscoreLoader;

export function EndedGame({ game }: { game: GameItem | BoxscoreData }) {
  return (
    <div className="relative">
      <FavoriteButton game={game} />
      <div className="shadow-md rounded-lg p-4">
        <EndedGameHeader
          lastPeriod={game.gameOutcome.lastPeriodType}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
          otPeriods={game.gameOutcome.otPeriods}
        />
        <StartTimeToggle gameStartTime={game.startTimeUTC} />
        <Venue venue={game.venue.default} homeTeamAbbrev={game.homeTeam.abbrev} />
        <EndedGameDetails
          threeMinRecapLink={game.threeMinRecap}
          condensedGameLink={game.condensedGame}
        />
        <GameDetailsButton game_id={game.id} />
      </div>
    </div>
  );
}
