import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { type Application } from 'express';
import cookieParser from 'cookie-parser';
import favoriteController from './favoriteController';
import { findUserByTokenRepository } from '../repositories/findUserRepository';
import { validateTokenRepository } from '../repositories/validateTokenRepository';
import { addFavoriteRepository } from '../repositories/addFavoriteRepository';
import { removeFavoriteRepository } from '../repositories/removeFavoriteRepository';
import { checkFavoriteRepository } from '../repositories/checkFavoriteRepository';
import { type GameItem } from '../models';

vi.mock('../repositories/findUserRepository');
vi.mock('../repositories/validateTokenRepository');
vi.mock('../repositories/addFavoriteRepository');
vi.mock('../repositories/removeFavoriteRepository');
vi.mock('../repositories/checkFavoriteRepository');

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', favoriteController);

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
};

const mockGame: GameItem = {
  id: 123,
  season: 20232024,
  gameType: 2,
  gameDate: '2024-04-18',
  venue: { default: 'Some Arena' },
  startTimeUTC: '2024-04-19T00:00:00Z',
  easternUTCOffset: '-04:00',
  venueUTCOffset: '-04:00',
  tvBroadcasts: [],
  gameState: 'OFF',
  gameScheduleState: 'OK',
  awayTeam: {
    id: 1,
    name: { default: 'Away Team' },
    abbrev: 'AWY',
    score: 0,
    sog: 0,
    logo: '',
  },
  homeTeam: {
    id: 2,
    name: { default: 'Home Team' },
    abbrev: 'HME',
    score: 0,
    sog: 0,
    logo: '',
  },
  gameCenterLink: '',
  threeMinRecap: '',
  threeMinRecapFr: '',
  condensedGame: '',
  condensedGameFr: '',
  clock: {
    timeRemaining: '00:00',
    secondsRemaining: 0,
    running: false,
    inIntermission: false,
  },
  neutralSite: false,
  venueTimezone: 'America/New_York',
  period: 3,
  periodDescriptor: {
    number: 3,
    periodType: 'REG',
    maxRegulationPeriods: 3,
  },
  gameOutcome: {
    lastPeriodType: 'REG',
  },
  goals: [],
};

describe('Favorite Controller', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(validateTokenRepository).mockResolvedValue(true);
    vi.mocked(findUserByTokenRepository).mockResolvedValue(mockUser);
  });

  describe('POST /', () => {
    it('should add a game to favorites', async () => {
      vi.mocked(addFavoriteRepository).mockResolvedValue();
      const response = await request(app)
        .post('/?id=123')
        .set('Cookie', 'token=validtoken')
        .send(mockGame);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Game favorited successfully');
    });

    it('should return 400 if game ID is missing', async () => {
      const response = await request(app).post('/').set('Cookie', 'token=validtoken').send(mockGame);
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /', () => {
    it('should remove a game from favorites', async () => {
      vi.mocked(removeFavoriteRepository).mockResolvedValue();
      const response = await request(app).delete('/?id=123').set('Cookie', 'token=validtoken');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Game removed from favorites');
    });

    it('should return 400 if game ID is missing', async () => {
      const response = await request(app).delete('/').set('Cookie', 'token=validtoken');
      expect(response.status).toBe(400);
    });
  });

  describe('GET /', () => {
    it('should check if a game is favorited', async () => {
      vi.mocked(checkFavoriteRepository).mockResolvedValue(true);
      const response = await request(app).get('/?id=123').set('Cookie', 'token=validtoken');
      expect(response.status).toBe(200);
      expect(response.body.favorited).toBe(true);
    });

    it('should return 400 if game ID is missing', async () => {
      const response = await request(app).get('/').set('Cookie', 'token=validtoken');
      expect(response.status).toBe(400);
    });
  });
});
