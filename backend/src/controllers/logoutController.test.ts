import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { type Application } from 'express';
import cookieParser from 'cookie-parser';
import logoutController from './logoutController';
import { revokeTokenRepository } from '../repositories/revokeTokenRepository';

vi.mock('../repositories/revokeTokenRepository');

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', logoutController);

describe('Logout Controller', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should logout a user', async () => {
    vi.mocked(revokeTokenRepository).mockResolvedValue();

    const response = await request(app).get('/').set('Cookie', 'token=validtoken');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged out successfully');
    expect(response.headers['set-cookie'][0]).toContain('token=;');
  });

  it('should return 401 if not authenticated', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(401);
  });

  it('should return 400 on error', async () => {
    const errorMessage = 'Database error';
    vi.mocked(revokeTokenRepository).mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get('/').set('Cookie', 'token=validtoken');

    expect(response.status).toBe(400);
    expect(response.body.message).toContain(errorMessage);
  });
});
