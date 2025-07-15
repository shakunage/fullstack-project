import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { type Application } from 'express';
import cookieParser from 'cookie-parser';
import signupController from './signupController';
import { createUserRepository } from '../repositories/createUserRepository';
import { addTokenRepository } from '../repositories/addTokenRepository';
import jwt from 'jsonwebtoken';

vi.mock('../repositories/createUserRepository');
vi.mock('../repositories/addTokenRepository');
vi.mock('jsonwebtoken');

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', signupController);

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
};

describe('Signup Controller', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should signup a user and return a token', async () => {
    vi.mocked(createUserRepository).mockResolvedValue(mockUser);
    vi.mocked(jwt.sign).mockImplementation(() => 'testtoken');
    vi.mocked(addTokenRepository).mockResolvedValue();

    const response = await request(app)
      .post('/')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Signup successful');
    expect(response.headers['set-cookie'][0]).toContain('token=testtoken');
  });

  it('should return 400 on error', async () => {
    const errorMessage = 'Database error';
    vi.mocked(createUserRepository).mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .post('/')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain(errorMessage);
  });
});
