import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "~/hooks/useAuth";
import { checkFavorite, addFavorite, removeFavorite } from "~/services/backendServices/favoriteService";
import type { BoxscoreData, GameItem } from "~/entities";

export function FavoriteButton({ game }: { game: GameItem }) {
  const queryClient = useQueryClient();
  const { username, isLoading: isAuthLoading } = useAuth();

  const { data: favoriteStatus, isLoading: isFavoriteLoading } = useQuery({
    queryKey: ["checkfavorite", game.id],
    queryFn: () => checkFavorite(game.id),
    enabled: !!username,
  });

  const favoriteMutation = useMutation({
    mutationFn: () => addFavorite(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkfavorite", game.id] });
    },
  });

  const unfavoriteMutation = useMutation({
    mutationFn: () => removeFavorite(game.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkfavorite", game.id] });
    },
  });

  const handleFavoriteToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
        onClick={(event) => handleFavoriteToggle(event)}
        aria-label={favoriteStatus ? "Unfavorite" : "Favorite"}
        disabled={isAuthLoading || isFavoriteLoading || favoriteMutation.isPending || unfavoriteMutation.isPending}
      >
        {username ? (
          isAuthLoading || isFavoriteLoading || favoriteMutation.isPending || unfavoriteMutation.isPending ? (
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
    </div>
  );
}
