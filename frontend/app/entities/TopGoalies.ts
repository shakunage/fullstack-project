interface LocalizedName {
  default: string;
  [key: string]: string | undefined; // Allow for other language keys like cs, sk, fi, fr, sv
}

export type GoalieStat = {
  id: number;
  firstName: LocalizedName;
  lastName: LocalizedName;
  sweaterNumber: number;
  headshot: string;
  teamAbbrev: string;
  teamName: LocalizedName;
  teamLogo: string;
  position: string;
  value: number;
};

export type TopGoalies = {
  wins: GoalieStat[];
  shutouts: GoalieStat[];
  savePctg: GoalieStat[];
  goalsAgainstAverage: GoalieStat[];
};
