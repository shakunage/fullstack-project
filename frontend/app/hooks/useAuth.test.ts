import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as authService from '~/services/backendServices/authService';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(QueryClientProvider, { client: queryClient }, children);

vi.mock('~/services/backendServices/authService');

describe('useAuth', () => {
  it('should return true when authenticated', async () => {
    vi.mocked(authService.checkAuthStatus).mockResolvedValue(true);
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.username).toBe(true);
  });

  it('should return false when not authenticated', async () => {
    vi.mocked(authService.checkAuthStatus).mockResolvedValue(false);
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.username).toBe(false);
  });

  it('should call logoutUser and invalidate queries on logout', async () => {
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    vi.mocked(authService.logoutUser).mockResolvedValue(true);

    const { result } = renderHook(() => useAuth(), { wrapper });

    result.current.logout();

    await waitFor(() => {
      expect(authService.logoutUser).toHaveBeenCalled();
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['authStatus'] });
    });
  });
});
