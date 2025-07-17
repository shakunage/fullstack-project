import { useNavigate } from 'react-router';
import type { GameItem } from '~/entities';
import { EndedGame } from './GameCards/EndedGame';
import { FutureGame } from './GameCards/FutureGame';
import { LiveGame } from './GameCards/LiveGame';
import Spinner  from '~/components/icons/Spinner';

export function MatchDayGames({ games }: { games: GameItem[] }) {
  const navigate = useNavigate();

  const handleGameClick = (gameId: number) => {
    void navigate(`/game/${gameId}`);
  };

  if (!games) {
    return <><Spinner/></>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {games.map((game) => (
        <div
          key={game.id}
          className="hover:bg-gray-200 cursor-pointer"
          onClick={() => handleGameClick(game.id)}
        >
          {game.gameState === 'FUT' || game.gameState === 'PRE' ? (
            <FutureGame game={game} />
          ) : game.gameState === 'LIVE' || game.gameState === 'CRIT' ? (
            <LiveGame game={game} />
          ) : game.gameState === 'OFF' || game.gameState === 'FINAL' ? (
            <EndedGame game={game} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
