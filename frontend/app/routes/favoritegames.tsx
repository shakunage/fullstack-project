import { useLoaderData } from "react-router";
import { favoritegamesLoader } from "~/loaders/favoritegamesLoader";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import type { BoxscoreData } from "~/entities/BoxscoreData";
import { FavoriteGame } from "~/components/GameCards/FavoriteGame";

export async function clientLoader(): Promise<BoxscoreData[]> {
  const favoriteGameIds = await favoritegamesLoader();

  if (!favoriteGameIds || favoriteGameIds.length === 0) {
    return [];
  }

  try {
    const gameDetailsPromises = favoriteGameIds.map((id) => {
      return fetchBoxscore("0000-00-00", String(id)); // Pass a dummy date for gameDate
    });
    const gameDetailsResults = await Promise.all(gameDetailsPromises);
    return gameDetailsResults.filter((detail) => detail != null) as BoxscoreData[];
  } catch (error) {
    console.error("Error fetching favorite game details using fetchBoxscore:", error);
    return [];
  }
}

export default function FavoriteGames() {
  const favoriteGamesData = useLoaderData<typeof clientLoader>();

  if (!favoriteGamesData || favoriteGamesData.length === 0) {
    return (
      <div className="pt-16 text-center">No favorite games found or details could not be fetched.</div>
    );
  }

  // Sort games by startTimeUTC, latest to earliest
  const sortedFavoriteGames = [...favoriteGamesData].sort(
    (a, b) => new Date(b.startTimeUTC).getTime() - new Date(a.startTimeUTC).getTime()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {sortedFavoriteGames.map((game) => (
        <FavoriteGame key={game.id} game={game} />
      ))}
    </div>
  );
}
