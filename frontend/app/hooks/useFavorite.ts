import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { GameItem } from "~/entities/GameItem";
import { checkFavorite, addFavorite, removeFavorite } from "~/services/backendServices/favoriteService";

export function useFavorite(game: GameItem, username: string | boolean | undefined) {
  const queryClient = useQueryClient();

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

  return {
    favoriteStatus,
    isFavoriteLoading,
    favoriteMutation,
    unfavoriteMutation,
  };
}
