import { describe, it, expect } from 'vitest';
import { formatTime } from './formatTime';

describe('formatTime', () => {
  it('should format the time correctly for a given timezone', () => {
    const date = new Date('2024-07-15T12:00:00Z');
    const expectedTime = 'Jul 15, 2024, 9:00 PM';
    expect(formatTime(date, 'Asia/Tokyo')).toBe(expectedTime);
  });

  it('should format the time correctly for another timezone', () => {
    const date = new Date('2024-07-15T12:00:00Z');
    const expectedTime = 'Jul 15, 2024, 5:00 AM';
    expect(formatTime(date, 'America/Los_Angeles')).toBe(expectedTime);
  });
});
