import { describe, it, expect } from 'vitest';
import { calculateTimeUntilStart } from './calculateTimeUntilStart';

describe('calculateTimeUntilStart', () => {
  const now = new Date('2025-07-17T10:00:00.000Z');

  it('should return the remaining time when the game is in the future', () => {
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 2);
    futureDate.setHours(futureDate.getHours() + 3);
    const gameStartTime = futureDate.toISOString();
    expect(calculateTimeUntilStart(gameStartTime, now)).toBe('2 days 3 hours');
  });

  it('should return "1 day" and hours when the game is one day away', () => {
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 1);
    futureDate.setHours(futureDate.getHours() + 5);
    const gameStartTime = futureDate.toISOString();
    expect(calculateTimeUntilStart(gameStartTime, now)).toBe('1 day 5 hours');
  });

  it('should return hours and minutes when the game is less than a day away', () => {
    const futureDate = new Date(now);
    futureDate.setHours(futureDate.getHours() + 4);
    futureDate.setMinutes(futureDate.getMinutes() + 30);
    const gameStartTime = futureDate.toISOString();
    expect(calculateTimeUntilStart(gameStartTime, now)).toBe('4 hours 30 minutes');
  });

  it('should return a message when the game has already started', () => {
    const pastDate = new Date(now);
    pastDate.setHours(pastDate.getHours() - 1);
    const gameStartTime = pastDate.toISOString();
    expect(calculateTimeUntilStart(gameStartTime, now)).toBe(
      `Game will begin momentarily – scheduled to start at ${gameStartTime}`,
    );
  });
});
