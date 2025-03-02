import type { GameItem } from "../../../entities/GameItem";

export function Venue({ game }: { game: GameItem }) {
  return (
    <>
      <p className="text-gray-700">
        Venue: {game.venue.default} ({game.homeTeam.abbrev} home)
      </p>
    </>
  );
}
