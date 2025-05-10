import { useLoaderData } from "react-router";
import { favoritegamesLoader } from "~/loaders/favoritegamesLoader";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import type { BoxscoreData } from "~/entities/BoxscoreData";
import { FavoriteGame } from "~/components/GameCards/FavoriteGame";

export const clientLoader = favoritegamesLoader;

export default function FavoriteGames() {
  const favoriteGamesData = useLoaderData<typeof clientLoader>();

  if (!favoriteGamesData || favoriteGamesData.length === 0) {
    return (
      <div className="pt-16 text-center">No favorite games found or details could not be fetched.</div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {favoriteGamesData.map((game) => (
        <FavoriteGame key={game.id} game={game} />
      ))}
    </div>
  );
}
