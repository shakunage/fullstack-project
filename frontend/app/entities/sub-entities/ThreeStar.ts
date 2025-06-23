export interface ThreeStar {
  star: number;
  playerId: number;
  teamAbbrev: string;
  headshot: string;
  name: string | { default: string };
  sweaterNo: number;
  position: string;
  goals?: number;
  assists?: number;
  points?: number;
  goalsAgainstAverage?: number;
  savePctg?: number;
}
