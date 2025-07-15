import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { type Application } from 'express';
import cookieParser from 'cookie-parser';
import authcheckController from './authcheckController';
import { findUserByTokenRepository } from '../repositories/findUserRepository';
import { validateTokenRepository } from '../repositories/validateTokenRepository';

vi.mock('../repositories/findUserRepository');
vi.mock('../repositories/validateTokenRepository');

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', authcheckController);

describe('Authcheck Controller', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return 204 if no token is provided', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(204);
  });

  it('should return 401 if token is invalid', async () => {
    vi.mocked(validateTokenRepository).mockResolvedValue(false);
    const response = await request(app).get('/').set('Cookie', 'token=invalidtoken');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid token');
  });

  it('should return 200 and user name if token is valid', async () => {
    const userName = 'Test User';
    vi.mocked(validateTokenRepository).mockResolvedValue(true);
    vi.mocked(findUserByTokenRepository).mockResolvedValue({
      id: '1',
      name: userName,
      email: 'test@example.com',
    });
    const response = await request(app).get('/').set('Cookie', 'token=validtoken');
    expect(response.status).toBe(200);
    expect(response.body).toBe(userName);
  });

  it('should return 400 on error', async () => {
    const errorMessage = 'Database error';
    vi.mocked(validateTokenRepository).mockRejectedValue(new Error(errorMessage));
    const response = await request(app).get('/').set('Cookie', 'token=validtoken');
    expect(response.status).toBe(400);
    expect(response.body.message).toContain(errorMessage);
  });
});
