import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { GameItem } from '~/entities/GameItem';
import {
  checkFavoriteService,
  addFavoriteService,
  removeFavoriteService,
} from '~/services/backendServices/favoriteService';

export function useFavorite(game: GameItem, username: string | boolean | undefined) {
  const queryClient = useQueryClient();

  const { data: favoriteStatus, isLoading: isFavoriteLoading } = useQuery({
    queryKey: ['checkfavorite', game.id],
    queryFn: () => checkFavoriteService(game.id),
    enabled: !!username,
  });

  const favoriteMutation = useMutation({
    mutationFn: () => addFavoriteService(game),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['checkfavorite', game.id] });
    },
  });

  const unfavoriteMutation = useMutation({
    mutationFn: () => removeFavoriteService(game.id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['checkfavorite', game.id] });
    },
  });

  return {
    favoriteStatus,
    isFavoriteLoading,
    favoriteMutation,
    unfavoriteMutation,
  };
}
