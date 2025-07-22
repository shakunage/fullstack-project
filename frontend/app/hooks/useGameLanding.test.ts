import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGameLanding } from './useGameLanding';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as landingService from '~/services/nhlApiServices/gameLandingService';
import type { GameLanding } from '~/entities';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(QueryClientProvider, { client: queryClient }, children);

vi.mock('~/services/nhlApiServices/gameLandingService');

const mockLanding: GameLanding = {
  id: 1,
  season: 20232024,
  gameType: 2,
  limitedScoring: false,
  gameDate: '2024-07-15',
  venue: { default: 'Test Arena' },
  venueLocation: { default: 'Test City' },
  startTimeUTC: '2024-07-15T23:00:00Z',
  easternUTCOffset: '-04:00',
  venueUTCOffset: '-04:00',
  venueTimezone: 'America/New_York',
  periodDescriptor: { number: 3, periodType: 'REG', maxRegulationPeriods: 3 },
  tvBroadcasts: [],
  gameState: 'FINAL',
  gameScheduleState: 'OK',
  awayTeam: { id: 1, name: { default: 'Team A' }, abbrev: 'TA', score: 2, sog: 25, logo: '' },
  homeTeam: { id: 2, name: { default: 'Team B' }, abbrev: 'TB', score: 3, sog: 30, logo: '' },
  shootoutInUse: false,
  regPeriods: 3,
  otInUse: false,
  tiesInUse: false,
  summary: {
    scoring: [],
    shootout: [],
    threeStars: [],
    teamGameStats: [],
  },
  clock: { timeRemaining: '00:00', secondsRemaining: 0, running: false, inIntermission: false },
};

describe('useGameLanding', () => {
  it('should fetch landing data successfully', async () => {
    vi.mocked(landingService.fetchLandingService).mockResolvedValue(mockLanding);
    const { result } = renderHook(() => useGameLanding(1), { wrapper });

    await result.current.refetchLanding();

    await waitFor(() => expect(result.current.isFetchingLanding).toBe(false));
    expect(result.current.fetchedLandingData).toEqual(mockLanding);
  });

  it('should throw an error if id is not provided', async () => {
    const { result } = renderHook(() => useGameLanding(null as unknown as number), { wrapper });

    await expect(result.current.refetchLanding()).rejects.toThrow(
      'Game date or ID is missing for fetching boxscore.'
    );
  });
});
