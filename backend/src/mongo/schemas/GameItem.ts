import mongoose, { Schema, InferSchemaType } from 'mongoose';

export const gameSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  season: { type: Number, required: true },
  gameType: { type: Number, required: true },
  gameDate: { type: String, required: true },
  venue: {
    default: { type: String, required: true },
  },
  startTimeUTC: { type: String, required: true },
  easternUTCOffset: { type: String, required: true },
  venueUTCOffset: { type: String, required: true },
  tvBroadcasts: [{
    id: { type: Number, required: true },
    market: { type: String, required: true },
    countryCode: { type: String, required: true },
    network: { type: String, required: true },
    sequenceNumber: { type: Number, required: true },
  }],
  gameState: { type: String, required: true },
  gameScheduleState: { type: String, required: true },
  awayTeam: {
    id: { type: Number, required: true },
    name: {
      default: { type: String, required: true },
    },
    abbrev: { type: String, required: true },
    score: { type: Number, required: true },
    sog: { type: Number, required: true },
    logo: { type: String, required: true },
  },
  homeTeam: {
    id: { type: Number, required: true },
    name: {
      default: { type: String, required: true },
    },
    abbrev: { type: String, required: true },
    score: { type: Number, required: true },
    sog: { type: Number, required: true },
    logo: { type: String, required: true },
  },
  gameCenterLink: { type: String, required: true },
  threeMinRecap: { type: String },
  threeMinRecapFr: { type: String },
  condensedGame: { type: String },
  condensedGameFr: { type: String },
  clock: {
    timeRemaining: { type: String, required: true },
    secondsRemaining: { type: Number, required: true },
    running: { type: Boolean, required: true },
    inIntermission: { type: Boolean, required: true },
  },
  neutralSite: { type: Boolean, required: true },
  venueTimezone: { type: String, required: true },
  period: { type: Number },
  periodDescriptor: {
    number: { type: Number },
    periodType: { type: String },
    maxRegulationPeriods: { type: Number },
  },
  gameOutcome: {
    lastPeriodType: { type: String },
    otPeriods: { type: Number },
  },
  goals: [{
    period: { type: Number, required: true },
    periodDescriptor: {
      number: { type: Number, required: true },
      periodType: { type: String, required: true },
      maxRegulationPeriods: { type: Number, required: true },
    },
    timeInPeriod: { type: String, required: true },
    playerId: { type: Number, required: true },
    name: {
      default: { type: String, required: true },
    },
    firstName: {
      default: { type: String, required: true },
    },
    lastName: {
      default: { type: String, required: true },
    },
    goalModifier: { type: String, required: true },
    assists: [{
      playerId: { type: Number, required: true },
      name: {
        default: { type: String, required: true },
        cs: { type: String },
        sk: { type: String },
      },
      assistsToDate: { type: Number, required: true },
    }],
    mugshot: { type: String, required: true },
    teamAbbrev: { type: String, required: true },
    goalsToDate: { type: Number, required: true },
    awayScore: { type: Number, required: true },
    homeScore: { type: Number, required: true },
    strength: { type: String, required: true },
    highlightClipSharingUrl: { type: String },
    highlightClipSharingUrlFr: { type: String },
    highlightClip: { type: Number },
    highlightClipFr: { type: Number },
    discreteClip: { type: Number },
    discreteClipFr: { type: Number },
  }],
}, {
  timestamps: true,
});

export type GameItemType = InferSchemaType<typeof gameSchema>;

export const GameModel = mongoose.model<GameItemType>('Game', gameSchema);
