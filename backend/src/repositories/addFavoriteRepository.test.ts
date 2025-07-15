import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addFavoriteRepository } from './addFavoriteRepository.ts';
import mongoose, { Model } from 'mongoose';
import redisClient from '../redis/redisClient.ts';
import { GameItemType, gameSchema } from '../mongo/schemas/GameSchema.ts';
import { type GameItem } from '../models/GameItem.ts';

const execMock = vi.fn();
const saveMock = vi.fn();

// Mock mongoose and redis
vi.mock('mongoose', () => {
  const modelMock = vi.fn().mockImplementation(() => ({
    save: saveMock,
  }));

  modelMock.findOne = vi.fn(() => ({
    exec: execMock,
  }));

  modelMock.updateOne = vi.fn(() => ({
    exec: execMock,
  }));

  class MongooseError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'MongooseError';
    }
  }
  MongooseError.ValidationError = class ValidationError extends MongooseError {};

  const mongooseMock = {
    model: vi.fn().mockReturnValue(modelMock),
    models: {
      Games: modelMock,
    },
    Schema: class Schema {},
    Error: MongooseError,
  };

  return {
    __esModule: true,
    default: mongooseMock,
    Model: class Model {},
    Schema: class Schema {},
    Error: mongooseMock.Error,
  };
});

vi.mock('../redis/redisClient.ts', () => ({
  default: {
    del: vi.fn(),
  },
}));

const mockGame: GameItem = {
  id: 123,
  season: 2023,
  gameType: 2,
  gameDate: '2023-01-01',
  venue: { default: 'Test Venue' },
  startTimeUTC: '2023-01-01T18:00:00Z',
  easternUTCOffset: '-05:00',
  venueUTCOffset: '-05:00',
  tvBroadcasts: [],
  gameState: 'OFF',
  gameScheduleState: 'OK',
  awayTeam: { id: 1, name: { default: 'Away Team' }, abbrev: 'AWY', score: 0, sog: 0, logo: '' },
  homeTeam: { id: 2, name: { default: 'Home Team' }, abbrev: 'HME', score: 0, sog: 0, logo: '' },
  gameCenterLink: '',
  threeMinRecap: '',
  threeMinRecapFr: '',
  condensedGame: '',
  condensedGameFr: '',
  clock: { timeRemaining: '00:00', secondsRemaining: 0, running: false, inIntermission: false },
  neutralSite: false,
  venueTimezone: 'America/New_York',
  period: 3,
  periodDescriptor: { number: 3, periodType: 'REG', maxRegulationPeriods: 3 },
  gameOutcome: { lastPeriodType: 'REG' },
  goals: [],
};

const Game = mongoose.model<GameItemType>('Games', gameSchema);

describe('addFavoriteRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should add a new favorite game if it does not exist', async () => {
    const userId = 'user1';

    execMock.mockResolvedValue(null);
    saveMock.mockResolvedValue(undefined);

    await addFavoriteRepository(mockGame, userId);

    expect(redisClient.del).toHaveBeenCalledWith(`user_favorites:${userId}`);
    expect(Game.findOne).toHaveBeenCalledWith({ id: mockGame.id });
    expect(saveMock).toHaveBeenCalled();
  });

  it('should update an existing game with a new user', async () => {
    const userId = 'user1';
    const existingGame = { ...mockGame, favoritedBy: ['user0'] };

    execMock.mockResolvedValueOnce(existingGame); // for findOne
    execMock.mockResolvedValueOnce({} as any); // for updateOne

    await addFavoriteRepository(mockGame, userId);

    expect(redisClient.del).toHaveBeenCalledWith(`user_favorites:${userId}`);
    expect(Game.findOne).toHaveBeenCalledWith({ id: mockGame.id });
    expect(Game.updateOne).toHaveBeenCalledWith(
      { id: mockGame.id },
      { $addToSet: { favoritedBy: userId } },
    );
  });

  it('should throw an error if redis fails', async () => {
    const userId = 'user1';

    vi.mocked(redisClient.del).mockRejectedValue(new Error('Redis error'));

    await expect(addFavoriteRepository(mockGame, userId)).rejects.toThrow(
      `Failed to save favorite game ${mockGame.id} to MongoDB.`,
    );

    expect(Game.findOne).not.toHaveBeenCalled();
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('should throw an error if saving to MongoDB fails', async () => {
    const userId = 'user1';

    execMock.mockResolvedValue(null);
    const mongoError = new Error('MongoDB error');
    saveMock.mockRejectedValue(mongoError);

    await expect(addFavoriteRepository(mockGame, userId)).rejects.toThrow(
      `Failed to save favorite game ${mockGame.id} to MongoDB.`,
    );
  });
});
