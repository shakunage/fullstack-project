import React from "react";
import type { BoxscoreData } from "~/entities/BoxscoreData"; // Ensure this path is correct
import { EndedGameHeader } from "./subcomponents/EndedGameHeader";
import { StartTimeToggle } from "./subcomponents/StartTimeToggle";
import { Venue } from "./subcomponents/Venue";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { FavoriteService } from "~/services/backendServices/favoriteService";

export function FavoriteGame({ game }: { game: BoxscoreData }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.auth.username);

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

  const handleGameClick = (gameId: number) => {
    void navigate(`/about`);
  };

  return (
    <div className="relative">
      <button
        className={`absolute top-2 right-2 ${favoriteStatus ? "text-yellow-500" : "text-gray-400"}`}
        onClick={handleFavoriteToggle}
        aria-label={favoriteStatus ? "Unfavorite" : "Favorite"}
        disabled={isLoading || favoriteMutation.isPending || unfavoriteMutation.isPending}
      >
        {username ? (
          isLoading || favoriteMutation.isPending || unfavoriteMutation.isPending ? (
            "..."
          ) : favoriteStatus ? (
            "★"
          ) : (
            "☆"
          )
        ) : (
          <></>
        )}
      </button>
      <div
        key={game.id}
        className="hover:bg-gray-200 cursor-pointer shadow-md rounded-lg p-4"
        onClick={() => handleGameClick(game.id)}
      >
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
    </div>
  );
}
