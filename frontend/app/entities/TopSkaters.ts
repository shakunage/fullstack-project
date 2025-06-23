type SkaterStat = {
  id: number;
  firstName: {
    default: string;
    [key: string]: string | undefined;
  };
  lastName: {
    default: string;
    [key: string]: string | undefined;
  };
  sweaterNumber: number;
  headshot: string;
  teamAbbrev: string;
  teamName: {
    default: string;
    [key: string]: string | undefined;
  };
  teamLogo: string;
  position: string;
  value: number;
};

export type TopSkaters = {
  goalsSh: SkaterStat[];
  plusMinus: SkaterStat[];
  assists: SkaterStat[];
  goalsPp: SkaterStat[];
  faceoffLeaders: SkaterStat[];
  penaltyMins: SkaterStat[];
  goals: SkaterStat[];
  points: SkaterStat[];
  toi: SkaterStat[];
};
