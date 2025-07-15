import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import { checkAuthTokenValidity } from './checkAuthTokenValidity';

const SECRET_KEY = 'your_secret_key';

describe('checkAuthTokenValidity', () => {
  it('should return true for a valid token', () => {
    const token = jwt.sign({ userId: '123' }, SECRET_KEY, { expiresIn: '1h' });
    expect(checkAuthTokenValidity(token)).toBe(true);
  });

  it('should return false for an invalid token', () => {
    const invalidToken = 'invalid_token';
    expect(checkAuthTokenValidity(invalidToken)).toBe(false);
  });

  it('should return false for an expired token', () => {
    const expiredToken = jwt.sign({ userId: '123' }, SECRET_KEY, { expiresIn: '-1s' });
    // We need to wait for 1ms to ensure the token is expired
    setTimeout(() => {
      expect(checkAuthTokenValidity(expiredToken)).toBe(false);
    }, 1);
  });
});
