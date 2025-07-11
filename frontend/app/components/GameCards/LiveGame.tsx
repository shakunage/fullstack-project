import { Venue } from './subcomponents/Venue';
import { GameDetailsButton } from './subcomponents/GameDetailsButton';
import { resolveNameType } from '~/utils/resolveNameType';
import type { GameItem } from '~/entities/GameItem';

export function LiveGame({ game }: { game: GameItem }) {
  return (
    <div className="shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">
        {resolveNameType(game.homeTeam)} vs. {resolveNameType(game.awayTeam)}
      </h2>
      <p className="text-gray-700">
        Live score: {game.homeTeam.score} - {game.awayTeam.score} (Period {game.period})
      </p>
      <Venue venue={game.venue.default} homeTeamAbbrev={game.homeTeam.abbrev} />
      <GameDetailsButton game_id={game.id} />
    </div>
  );
}
