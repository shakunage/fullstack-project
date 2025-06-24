import mongoose, { Schema, InferSchemaType } from 'mongoose';


export const gameSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  season: { 
    type: Number, 
    required: true,
    min: [20000101, 'Season must be in YYYYYYYY format and not before the year 2000'] 
  },
  gameType: { 
    type: Number, 
    required: true,
    enum: {
        values: [1, 2, 3, 4], // Example: 1=Pre-season, 2=Regular, 3=Playoffs, 4=All-Star
        message: '{VALUE} is not a supported game type'
    }
  },
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
    countryCode: { type: String, required: true, maxlength: 2 },
    network: { type: String, required: true },
    sequenceNumber: { type: Number, required: true },
  }],
  gameState: { 
    type: String, 
    required: true,
    enum: ['OFF', 'LIVE', 'CRIT', 'FINAL', 'FUT', 'PPD'],
  },
  gameScheduleState: { type: String, required: true },
  awayTeam: {
    id: { type: Number, required: true },
    name: {
      default: { type: String, required: true },
    },
    abbrev: { type: String, required: true, minlength: 2, maxlength: 4 },
    score: { type: Number, required: true, min: 0 },
    sog: { type: Number, required: true, min: 0 },
    logo: { type: String, required: true },
  },
  homeTeam: {
    id: { type: Number, required: true },
    name: {
      default: { type: String, required: true },
    },
    abbrev: { type: String, required: true, minlength: 2, maxlength: 4 },
    score: { type: Number, required: true, min: 0 },
    sog: { type: Number, required: true, min: 0 },
    logo: { type: String, required: true },
  },
  gameCenterLink: { 
    type: String, 
    required: true
  },
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
    favoritedBy: [{
      type: String,
    }],
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
    goalsToDate: { type: Number },
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
