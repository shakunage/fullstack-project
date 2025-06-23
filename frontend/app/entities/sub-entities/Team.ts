export type Team = {
  id: number;
  name?: {
    default: string;
  };
  commonName?: {
    default: string;
  };
  abbrev: string;
  placeName?: {
    default: string;
    fr?: string;
  };
  placeNameWithPreposition?: {
    default: string;
    fr?: string;
  };
  score: number;
  sog: number;
  homeSplitSquad?: boolean;
  logo: string;
  darkLogo?: string;
  odds?: {
    description: string;
    value: number;
    qualifier: string;
  }[];
};
