import React from "react";
import { EndedGame } from "../components/GameCards/EndedGame";
import { FutureGame } from "../components/GameCards/FutureGame";
import { LiveGame } from "../components/GameCards/LiveGame";
import { useLoaderData } from "react-router";
import { favoritegamesLoader } from "~/loaders/favoritegamesLoader";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import type { BoxscoreData } from "~/entities/BoxscoreData"; // Ensure this path is correct
import { EndedGameHeader } from "../components/GameCards/subcomponents/EndedGameHeader";
import { EndedGameDetails } from "../components/GameCards/subcomponents/EndedGameDetails";
import { StartTimeToggle } from "../components/GameCards/subcomponents/StartTimeToggle";
import { FavoriteService } from "~/services/backendServices/favoriteService";
import { Venue } from "../components/GameCards/subcomponents/Venue";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {favoriteGamesData.map((game) => (
        <div className="bg-white shadow-md rounded-lg p-4">
          <React.Fragment key={game.id}>
            <EndedGameHeader
              lastPeriod={game.gameOutcome.lastPeriodType}
              homeTeam={game.homeTeam}
              awayTeam={game.awayTeam}
            />
            <StartTimeToggle gameStartTime={game.startTimeUTC} />
            <Venue venue={game.venue.default} homeTeamAbbrev={game.homeTeam.abbrev} />
          </React.Fragment>
        </div>
      ))}
    </div>
  );
}
