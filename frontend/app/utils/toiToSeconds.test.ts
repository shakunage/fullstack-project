import { describe, it, expect } from 'vitest';
import { toiToSeconds } from './toiToSeconds';

describe('toiToSeconds', () => {
  it('should convert a "MM:SS" string to seconds', () => {
    expect(toiToSeconds('20:34')).toBe(1234);
  });

  it('should handle single-digit minutes and seconds', () => {
    expect(toiToSeconds('01:05')).toBe(65);
  });

  it('should return 0 for an undefined input', () => {
    expect(toiToSeconds(undefined)).toBe(0);
  });

  it('should return 0 for a string without a colon', () => {
    expect(toiToSeconds('12345')).toBe(0);
  });

  it('should handle "00:00"', () => {
    expect(toiToSeconds('00:00')).toBe(0);
  });
});
