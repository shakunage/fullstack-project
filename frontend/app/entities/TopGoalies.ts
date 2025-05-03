// Interface for localized names (like firstName, lastName, teamName)
interface LocalizedName {
  default: string;
  [key: string]: string | undefined; // Allow for other language keys like cs, sk, fi, fr, sv
}

// Interface for a single goalie entry in the lists
export type GoalieStat = {
  id: number;
  firstName: LocalizedName;
  lastName: LocalizedName;
  sweaterNumber: number;
  headshot: string;
  teamAbbrev: string;
  teamName: LocalizedName;
  teamLogo: string;
  position: string; // Typically 'G' for goalies
  value: number; // Represents the stat value (wins, shutouts, save%, GAA)
};

// The main type for the top goalies data structure, matching goalie_sample.json
export type TopGoalies = {
  wins: GoalieStat[];
  shutouts: GoalieStat[];
  savePctg: GoalieStat[];
  goalsAgainstAverage: GoalieStat[];
};
