import { describe, it, expect } from 'vitest';
import { formatStatValue } from './formatStatValue';

describe('formatStatValue', () => {
  it('should format faceoffLeaders as a percentage', () => {
    expect(formatStatValue('faceoffLeaders', 0.523)).toBe('52.3%');
  });

  it('should format toi from seconds to M:SS format', () => {
    expect(formatStatValue('toi', 1234)).toBe('20:34');
  });

  it('should handle toi with less than 10 seconds correctly', () => {
    expect(formatStatValue('toi', 1205)).toBe('20:05');
  });

  it('should return the value as a string for other categories', () => {
    expect(formatStatValue('goals', 25)).toBe('25');
  });

  it('should handle string values by returning them as is', () => {
    expect(formatStatValue('playerName', 'Wayne Gretzky')).toBe('Wayne Gretzky');
  });
});
