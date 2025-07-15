import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useBoxscore } from './useBoxscore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as boxscoreService from '~/services/nhlApiServices/boxscoreService';
import type { Boxscore } from '~/entities';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(QueryClientProvider, { client: queryClient }, children);

vi.mock('~/services/nhlApiServices/boxscoreService');

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

describe('useBoxscore', () => {
  it('should fetch boxscore data successfully', async () => {
    vi.mocked(boxscoreService.fetchBoxscoreService).mockResolvedValue(mockBoxscore);
    const { result } = renderHook(() => useBoxscore(1), { wrapper });

    result.current.refetchBoxscore();

    await waitFor(() => expect(result.current.isFetchingBoxscore).toBe(false));
    expect(result.current.fetchedBoxscore).toEqual(mockBoxscore);
  });

  it('should throw an error if id is not provided', async () => {
    const { result } = renderHook(() => useBoxscore(null as any), { wrapper });

    await expect(result.current.refetchBoxscore()).rejects.toThrow(
      'Game date or ID is missing for fetching boxscore.',
    );
  });
});
