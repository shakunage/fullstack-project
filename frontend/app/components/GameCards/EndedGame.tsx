import axios from "axios";
import { GameDetailsButton } from "./subcomponents/GameDetailsButton";
import { useState } from "react";
import { boxscoreLoader } from "../../data/boxscoreLoader";
import type { GameItem } from "../../entities";
import { EndedGameHeader } from "./subcomponents/EndedGameHeader";
import { EndedGameDetails } from "./subcomponents/EndedGameDetails";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { Venue } from "./subcomponents/Venue";

export const loader = boxscoreLoader;

export function EndedGame({ game }: { game: GameItem }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      const response = await axios.post(`http://localhost:9998/backend/favorite?id=${game.id}`);
      if (response.status === 200) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Failed to favorite the game:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className={`absolute top-2 right-2 ${
          isFavorite ? "text-yellow-500" : "text-gray-400"
        }`}
        onClick={handleFavoriteClick}
        aria-label="Favorite"
      >
        ★
      </button>
      <div className="bg-white shadow-md rounded-lg p-4">
      <EndedGameHeader
        lastPeriod={game.gameOutcome.lastPeriodType}
        homeTeam={game.homeTeam}
        awayTeam={game.awayTeam}
      />
      <StartTimeToggle gameStartTime={game.startTimeUTC} />
      <Venue venue={game.venue.default} homeTeamAbbrev={game.homeTeam.abbrev} />
      <EndedGameDetails threeMinRecapLink={game.threeMinRecap} condensedGameLink={game.condensedGame} />
      <GameDetailsButton game={game} />
      </div>
    </div>
  );
}
