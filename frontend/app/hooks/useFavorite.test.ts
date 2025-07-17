import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFavorite } from './useFavorite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as favoriteService from '~/services/backendServices/favoriteService';
import type { GameItem } from '~/entities/GameItem';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(QueryClientProvider, { client: queryClient }, children);

vi.mock('~/services/backendServices/favoriteService');

const mockGame: GameItem = {
  id: 1,
  season: 20232024,
  gameType: 2,
  gameDate: '2024-07-15',
  venue: { default: 'Test Arena' },
  startTimeUTC: '2024-07-15T23:00:00Z',
  easternUTCOffset: '-04:00',
  venueUTCOffset: '-04:00',
  tvBroadcasts: [],
  gameState: 'FINAL',
  gameScheduleState: 'OK',
  awayTeam: { id: 1, name: { default: 'Team A' }, abbrev: 'TA', score: 2, sog: 25, logo: '' },
  homeTeam: { id: 2, name: { default: 'Team B' }, abbrev: 'TB', score: 3, sog: 30, logo: '' },
  gameCenterLink: '',
  threeMinRecap: '',
  threeMinRecapFr: '',
  condensedGame: '',
  condensedGameFr: '',
  clock: { timeRemaining: '00:00', secondsRemaining: 0, running: false, inIntermission: false },
  neutralSite: false,
  venueTimezone: 'America/New_York',
  period: 3,
  periodDescriptor: { number: 3, periodType: 'REG', maxRegulationPeriods: 3 },
  gameOutcome: { lastPeriodType: 'REG' },
  goals: [],
};

describe('useFavorite', () => {
  it('should check favorite status', async () => {
    vi.mocked(favoriteService.checkFavoriteService).mockResolvedValue(true);
    const { result } = renderHook(() => useFavorite(mockGame, 'testuser'), { wrapper });

    await waitFor(() => expect(result.current.isFavoriteLoading).toBe(false));
    expect(result.current.favoriteStatus).toBe(true);
  });

  it('should add a favorite', async () => {
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    vi.mocked(favoriteService.addFavoriteService).mockResolvedValue(true);
    const { result } = renderHook(() => useFavorite(mockGame, 'testuser'), { wrapper });

    result.current.favoriteMutation.mutate();

    await waitFor(() => {
      expect(favoriteService.addFavoriteService).toHaveBeenCalledWith(mockGame);
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['checkfavorite', mockGame.id] });
    });
  });

  it('should remove a favorite', async () => {
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    vi.mocked(favoriteService.removeFavoriteService).mockResolvedValue(true);
    const { result } = renderHook(() => useFavorite(mockGame, 'testuser'), { wrapper });

    result.current.unfavoriteMutation.mutate();

    await waitFor(() => {
      expect(favoriteService.removeFavoriteService).toHaveBeenCalledWith(mockGame.id);
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['checkfavorite', mockGame.id] });
    });
  });
});
