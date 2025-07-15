import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import request from 'supertest';
import express, { type Application } from 'express';
import cookieParser from 'cookie-parser';
import loginController from './loginController';
import { findUserByEmailRepository } from '../repositories/findUserRepository';
import { addTokenRepository } from '../repositories/addTokenRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

vi.mock('../repositories/findUserRepository');
vi.mock('../repositories/addTokenRepository');
vi.mock('bcrypt');
vi.mock('jsonwebtoken');

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', loginController);

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  password: 'hashedpassword',
};

describe('Login Controller', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should login a user and return a token', async () => {
    vi.mocked(findUserByEmailRepository).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
    vi.mocked(jwt.sign).mockImplementation(() => 'testtoken');
    vi.mocked(addTokenRepository).mockResolvedValue(undefined);

    const response = await request(app)
      .post('/')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.headers['set-cookie'][0]).toContain('token=testtoken');
  });

  it('should return 401 for invalid email', async () => {
    (findUserByEmailRepository as Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/')
      .send({ email: 'wrong@example.com', password: 'password' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });

  it('should return 401 for invalid password', async () => {
    (findUserByEmailRepository as Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as Mock).mockResolvedValue(false);

    const response = await request(app)
      .post('/')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });

  it('should return 400 on error', async () => {
    const errorMessage = 'Database error';
    (findUserByEmailRepository as Mock).mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .post('/')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain(errorMessage);
  });
});
