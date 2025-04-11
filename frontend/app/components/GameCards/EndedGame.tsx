import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { GameDetailsButton } from "./subcomponents/GameDetailsButton";
import { boxscoreLoader } from "../../loaders/boxscoreLoader";
import type { GameItem } from "../../entities";
import { EndedGameHeader } from "./subcomponents/EndedGameHeader";
import { EndedGameDetails } from "./subcomponents/EndedGameDetails";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { FavoriteService } from "~/services/backendServices/favoriteService";
import { Venue } from "./subcomponents/Venue";

export const loader = boxscoreLoader;

export function EndedGame({ game }: { game: GameItem }) {
  const queryClient = useQueryClient();
  const username = useSelector((state: RootState) => state.auth.username)
  
  const { data: favoriteStatus, isLoading } = useQuery({
    queryKey: ["checkfavorite", game.id],
    queryFn: () => FavoriteService.checkFavorite(game.id),
    enabled: !!username,
  });

  const favoriteMutation = useMutation({
    mutationFn: () => FavoriteService.addFavorite(game.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkfavorite", game.id] });
    },
  });

  const unfavoriteMutation = useMutation({
    mutationFn: () => FavoriteService.removeFavorite(game.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkfavorite", game.id] });
    },
  });

  const handleFavoriteToggle = () => {
    if (favoriteStatus) {
      unfavoriteMutation.mutate();
    } else {
      favoriteMutation.mutate();
    }
  };

  return (
    <div className="relative">
      <button
        className={`absolute top-2 right-2 ${favoriteStatus ? "text-yellow-500" : "text-gray-400"}`}
        onClick={handleFavoriteToggle}
        aria-label={favoriteStatus ? "Unfavorite" : "Favorite"}
        disabled={isLoading || favoriteMutation.isPending || unfavoriteMutation.isPending}
      >
        {username
        ? 
        (isLoading || favoriteMutation.isPending || unfavoriteMutation.isPending 
          ? "..."
          : (favoriteStatus ? "★" : "☆")) 
        : (<></>)
        }
      </button>
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Rest of your component */}
        <EndedGameHeader
          lastPeriod={game.gameOutcome.lastPeriodType}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
        />
        <StartTimeToggle gameStartTime={game.startTimeUTC} />
        <Venue venue={game.venue.default} homeTeamAbbrev={game.homeTeam.abbrev} />
        <EndedGameDetails
          threeMinRecapLink={game.threeMinRecap}
          condensedGameLink={game.condensedGame}
        />
        <GameDetailsButton game={game} />
      </div>
    </div>
  );
}
