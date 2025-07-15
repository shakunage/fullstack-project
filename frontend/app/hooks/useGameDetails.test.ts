import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGameDetails } from './useGameDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as boxscoreService from '~/services/nhlApiServices/boxscoreService';
import * as landingService from '~/services/nhlApiServices/gameLandingService';
import type { Boxscore, GameLanding } from '~/entities';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(QueryClientProvider, { client: queryClient }, children);

vi.mock('~/services/nhlApiServices/boxscoreService');
vi.mock('~/services/nhlApiServices/gameLandingService');

const mockBoxscore: Boxscore = {
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
  tvBroadcasts: [],
  gameState: 'FINAL',
  gameScheduleState: 'OK',
  periodDescriptor: { number: 3, periodType: 'REG', maxRegulationPeriods: 3 },
  regPeriods: 3,
  awayTeam: { id: 1, name: { default: 'Team A' }, abbrev: 'TA', score: 2, sog: 25, logo: '' },
  homeTeam: { id: 2, name: { default: 'Team B' }, abbrev: 'TB', score: 3, sog: 30, logo: '' },
  clock: { timeRemaining: '00:00', secondsRemaining: 0, running: false, inIntermission: false },
  playerByGameStats: {
    awayTeam: { forwards: [], defense: [], goalies: [] },
    homeTeam: { forwards: [], defense: [], goalies: [] },
  },
  summary: {},
  gameOutcome: { lastPeriodType: 'REG' },
};

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

describe('useGameDetails', () => {
  it('should fetch boxscore and landing data successfully', async () => {
    vi.mocked(boxscoreService.fetchBoxscoreService).mockResolvedValue(mockBoxscore);
    vi.mocked(landingService.fetchLandingService).mockResolvedValue(mockLanding);

    const { result } = renderHook(() => useGameDetails(1), { wrapper });

    result.current.refetch();

    await waitFor(() => expect(result.current.isFetching).toBe(false));
    expect(result.current.data).toEqual({ boxscore: mockBoxscore, landing: mockLanding });
  });
});
