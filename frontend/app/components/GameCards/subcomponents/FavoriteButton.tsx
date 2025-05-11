import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { FavoriteService } from "~/services/backendServices/favoriteService";

export function FavoriteButton({ game_id }: { game_id: number }) {
  const queryClient = useQueryClient();
  const username = useSelector((state: RootState) => state.auth.username);

  const { data: favoriteStatus, isLoading } = useQuery({
    queryKey: ["checkfavorite", game_id],
    queryFn: () => FavoriteService.checkFavorite(game_id),
    enabled: !!username,
  });

  const favoriteMutation = useMutation({
    mutationFn: () => FavoriteService.addFavorite(game_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkfavorite", game_id] });
    },
  });

  const unfavoriteMutation = useMutation({
    mutationFn: () => FavoriteService.removeFavorite(game_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkfavorite", game_id] });
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
    </div>
  );
}
