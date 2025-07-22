import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { type Application } from 'express';
import cookieParser from 'cookie-parser';
import favoriteListController from './favoriteListController';
import { findUserByTokenRepository } from '../repositories/findUserRepository';
import { validateTokenRepository } from '../repositories/validateTokenRepository';
import {
  favoriteListRepository,
  countFavoriteGamesRepository,
} from '../repositories/favoriteListRepository';
import { type GameItem } from '../models';

vi.mock('../repositories/findUserRepository');
vi.mock('../repositories/validateTokenRepository');
vi.mock('../repositories/favoriteListRepository');

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', favoriteListController);

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
};

const mockGame: Omit<GameItem, 'favoritedBy'> = {
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

describe('Favorite List Controller', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(validateTokenRepository).mockResolvedValue(true);
    vi.mocked(findUserByTokenRepository).mockResolvedValue(mockUser);
  });

  it('should return a paginated list of favorite games', async () => {
    const mockGames = [mockGame];
    const totalGames = 1;
    vi.mocked(favoriteListRepository).mockResolvedValue(mockGames);
    vi.mocked(countFavoriteGamesRepository).mockResolvedValue(totalGames);

    const response = await request(app).get('/?page=1&limit=10').set('Cookie', 'token=validtoken');

    expect(response.status).toBe(200);
    expect(response.body.favoriteGameList).toEqual(mockGames);
    expect(response.body.totalGames).toBe(totalGames);
    expect(response.body.currentPage).toBe(1);
    expect(response.body.totalPages).toBe(1);
  });

  it('should return 401 if not authenticated', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(401);
  });
});
