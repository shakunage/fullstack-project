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
      <EndedGameHeader game={game} />
      <StartTimeToggle game={game} />
      <Venue game={game} />
      <EndedGameDetails game={game} />
      <GameDetailsButton game={game} />
    </div>
  );
}
