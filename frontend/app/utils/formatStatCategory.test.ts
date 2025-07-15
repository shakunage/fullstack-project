import { describe, it, expect } from 'vitest';
import { formatStatCategory } from './formatStatCategory';

describe('formatStatCategory', () => {
  it('should format "goalsSh" to "Short Handed Goals"', () => {
    expect(formatStatCategory('goalsSh')).toBe('Short Handed Goals');
  });

  it('should format "plusMinus" to "Plus/Minus"', () => {
    expect(formatStatCategory('plusMinus')).toBe('Plus/Minus');
  });

  it('should format "goalsPp" to "Power Play Goals"', () => {
    expect(formatStatCategory('goalsPp')).toBe('Power Play Goals');
  });

  it('should format "faceoffLeaders" to "Faceoff %"', () => {
    expect(formatStatCategory('faceoffLeaders')).toBe('Faceoff %');
  });

  it('should format "penaltyMins" to "Penalty Minutes"', () => {
    expect(formatStatCategory('penaltyMins')).toBe('Penalty Minutes');
  });

  it('should format "toi" to "Time On Ice"', () => {
    expect(formatStatCategory('toi')).toBe('Time On Ice');
  });

  it('should capitalize the first letter for unhandled categories', () => {
    expect(formatStatCategory('shots')).toBe('Shots');
  });

  it('should return an empty string if the input is empty', () => {
    expect(formatStatCategory('')).toBe('');
  });
});
