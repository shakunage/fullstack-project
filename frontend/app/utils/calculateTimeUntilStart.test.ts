import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { calculateTimeUntilStart } from './calculateTimeUntilStart';
import dayjs from 'dayjs';

describe('calculateTimeUntilStart', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-07-17T10:00:00.000Z'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should return days and hours when the game is more than a day away', () => {
    const gameStartTime = dayjs().add(2, 'day').add(3, 'hour').toISOString();
    expect(calculateTimeUntilStart(gameStartTime)).toBe('2 days 3 hours');
  });

  it('should return "1 day" and hours when the game is one day away', () => {
    const gameStartTime = dayjs().add(1, 'day').add(5, 'hour').toISOString();
    expect(calculateTimeUntilStart(gameStartTime)).toBe('1 day 5 hours');
  });

  it('should return hours and minutes when the game is less than a day away', () => {
    const gameStartTime = dayjs().add(18, 'hour').add(30, 'minute').toISOString();
    expect(calculateTimeUntilStart(gameStartTime)).toBe('18 hours 30 minutes');
  });

  it('should return only minutes when the game is less than an hour away', () => {
    const gameStartTime = dayjs().add(45, 'minute').toISOString();
    expect(calculateTimeUntilStart(gameStartTime)).toBe('45 minutes');
  });

  it('should return a message when the game has already started', () => {
    const gameStartTime = dayjs().subtract(1, 'hour').toISOString();
    expect(calculateTimeUntilStart(gameStartTime)).toBe(
      'Game will begin momentarily',
    );
  });
});
