import { describe, it, expect } from 'vitest';
import isValidDate from './isValidDate';

describe('isValidDate', () => {
  it('should return a Date object for a valid date string', () => {
    const date = isValidDate('2024-07-15');
    expect(date).toBeInstanceOf(Date);
    if (date) {
      expect(date.toISOString().split('T')[0]).toBe('2024-07-15');
    }
  });

  it('should return false for an invalid date string', () => {
    expect(isValidDate('not-a-date')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(isValidDate('')).toBe(false);
  });

  it('should return false for a null value', () => {
    // @ts-expect-error - testing invalid input
    expect(isValidDate(null)).toBe(false);
  });

  it('should return false for an undefined value', () => {
    expect(isValidDate(undefined)).toBe(false);
  });
});
