import { useLoaderData, useNavigation, useNavigate } from 'react-router';
import { favoritegamesLoader } from '~/loaders/favoritegamesLoader';
import { PaginationControls } from '~/components/FavoriteGamesPage/PaginationControls';
import { EndedGame } from '~/components/GameCards/EndedGame';
import { useAuth } from '~/hooks/useAuth';
import Spinner from '~/components/icons/Spinner';

export const loader = favoritegamesLoader;

export default function FavoriteGames() {
  const { favoriteGameList, currentPage, totalPages, totalGames } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoadingData = navigation.state === 'loading';
  const { username } = useAuth();

  const handleGameClick = (gameId: number) => {
    void navigate(`/game/${gameId}`);
  };

  if (!username) {
    return (
      <div className="pt-16 text-center">
        You need to be logged in to save and browse your favorited games.
      </div>
    );
  }

  if (totalGames === 0) {
    return <div className="pt-16 text-center">No favorite games found.</div>;
  }

  if (!favoriteGameList || (favoriteGameList.length === 0 && totalGames > 0)) {
    return <div className="pt-16 text-center">Game details could not be fetched for this page.</div>;
  }

  return (
    <main className="mx-auto">
      <h1 className="text-2xl font-bold my-6 text-center">My Favorite Games</h1>
      <PaginationControls totalPages={totalPages} currentPage={currentPage} />
      {isLoadingData && <Spinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {favoriteGameList.map((game) => (
          <div
            key={game.id}
            className="hover:bg-gray-200 cursor-pointer"
            onClick={() => handleGameClick(game.id)}
          >
            <EndedGame game={game} />
          </div>
        ))}
      </div>
      <PaginationControls totalPages={totalPages} currentPage={currentPage} />
      <p className="text-center my-4 text-sm text-gray-600">
        Showing page {currentPage} of {totalPages} ({totalGames} total games)
      </p>
    </main>
  );
}
