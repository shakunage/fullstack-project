import { useTimeUntilStart } from '~/hooks/useTimeUntilStart';
import type { GameItem } from '~/entities/GameItem';
import { StartTimeToggle } from './subcomponents/StartTimeToggle';
import { Venue } from './subcomponents/Venue';
import type { Boxscore } from '~/entities/Boxscore';

export function FutureGame({ game }: { game: GameItem | Boxscore }) {
  const { timeUntilStart } = useTimeUntilStart(game.startTimeUTC);

  return (
    <div className="shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">
        {game.homeTeam.name?.default} vs. {game.awayTeam.name?.default}
      </h2>
      <div className="flex items-center text-gray-700">
        <StartTimeToggle gameStartTime={game.startTimeUTC} />
      </div>
      {timeUntilStart !== undefined ? (
        <p className="text-gray-700">Time until start: {timeUntilStart}</p>
      ) : (
        <p className="text-gray-700">Calculating time until start...</p>
      )}
      <Venue venue={game.venue.default} homeTeamAbbrev={game.homeTeam.abbrev} />
    </div>
  );
}
