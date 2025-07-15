import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTimeUntilStart } from './useTimeUntilStart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as timeUtils from '~/utils/calculateTimeUntilStart';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(QueryClientProvider, { client: queryClient }, children);

vi.mock('~/utils/calculateTimeUntilStart');

describe('useTimeUntilStart', () => {
  it('should call calculateTimeUntilStart and return the result', async () => {
    const gameStartTime = new Date().toISOString();
    vi.spyOn(timeUtils, 'calculateTimeUntilStart').mockReturnValue('10 minutes');

    const { result } = renderHook(() => useTimeUntilStart(gameStartTime), { wrapper });

    await waitFor(() => expect(result.current.timeUntilStart).toBe('10 minutes'));
    expect(timeUtils.calculateTimeUntilStart).toHaveBeenCalledWith(gameStartTime);
  });
});
