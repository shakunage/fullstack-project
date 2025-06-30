import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "~/hooks/useAuth";
import { useFavorite } from "~/hooks/useFavorite";
import type { GameItem } from "~/entities";

export function FavoriteButton({ game }: { game: GameItem }) {
  const queryClient = useQueryClient();
  const { username, isLoading: isAuthLoading } = useAuth();
  const { 
    favoriteStatus, 
    isFavoriteLoading, 
    favoriteMutation, 
    unfavoriteMutation 
  } = useFavorite(game, username);

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
