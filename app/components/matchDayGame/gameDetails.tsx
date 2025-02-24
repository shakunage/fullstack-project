import type { GameItem } from "../../entities/GameItem";
import { PlayVideoButton } from "../icons/PlayVideoButton";

export function GameDetails({ game }: { game: GameItem }) {
  return (
    <>
      <p className="text-gray-700 flex items-center">
        Watch Quick Recap (3 min)
        <a
          href={`https://www.nhl.com${game.threeMinRecap}`}
          className="text-blue-500 hover:underline flex items-center ml-2"
        >
          <PlayVideoButton />
        </a>
      </p>
      <p className="text-gray-700 flex items-center">
        Watch Condensed Game (10 min)
        <a
          href={`https://www.nhl.com${game.condensedGame}`}
          className="text-blue-500 hover:underline flex items-center ml-2"
        >
          <PlayVideoButton />
        </a>
      </p>
    </>
  );
}
