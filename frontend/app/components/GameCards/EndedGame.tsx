import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { GameDetailsButton } from "./subcomponents/GameDetailsButton";
import { boxscoreLoader } from "../../data/boxscoreLoader";
import type { GameItem } from "../../entities";
import { EndedGameHeader } from "./subcomponents/EndedGameHeader";
import { EndedGameDetails } from "./subcomponents/EndedGameDetails";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { Venue } from "./subcomponents/Venue";

export const loader = boxscoreLoader;

export function EndedGame({ game }: { game: GameItem }) {
  const queryClient = useQueryClient();
  const username = useSelector((state: RootState) => state.auth.username)
  
  const { data: favoriteStatus, isLoading } = useQuery({
    queryKey: ["checkfavorite", game.id],
    queryFn: () =>
      axios
        .get(`http://localhost:9998/backend/favorite?id=${game.id}`, { withCredentials: true })
        .then((res) => res.status),
  });

  const isFavorite = favoriteStatus === 200;

  const favoriteMutation = useMutation({
    mutationFn: () => 
      axios.post(`http://localhost:9998/backend/favorite?id=${game.id}`, {}, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkfavorite", game.id] });
    },
  });

  const unfavoriteMutation = useMutation({
    mutationFn: () => 
      axios.delete(`http://localhost:9998/backend/favorite?id=${game.id}`, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkfavorite", game.id] });
    },
  });

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      unfavoriteMutation.mutate();
    } else {
      favoriteMutation.mutate();
    }
  };

  return (
    <div className="relative">
      <button
        className={`absolute top-2 right-2 ${isFavorite ? "text-yellow-500" : "text-gray-400"}`}
        onClick={handleFavoriteToggle}
        aria-label={isFavorite ? "Unfavorite" : "Favorite"}
        disabled={isLoading || favoriteMutation.isPending || unfavoriteMutation.isPending}
      >
        {username
        ? 
        (isLoading || favoriteMutation.isPending || unfavoriteMutation.isPending 
          ? "..."
          : (isFavorite ? "★" : "☆")) 
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
