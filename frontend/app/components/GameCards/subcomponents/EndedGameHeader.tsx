// Removed direct GameItem import, will define a local flexible type
// import type { GameItem } from "../../../entities/GameItem";

// Define a flexible team type that can accommodate different name structures
type TeamNameStructure = { default: string };

type FlexibleTeamForHeader = {
  name?: TeamNameStructure;
  commonName?: TeamNameStructure;
  abbrev: string; // Used as a fallback if name/commonName is not available
  score: number;
  // Other properties like id, logo, sog might be present on the passed object
  // but are not directly used by this header component.
};

export function EndedGameHeader({
  lastPeriod,
  awayTeam,
  homeTeam,
}: {
  lastPeriod: string;
  awayTeam: FlexibleTeamForHeader;
  homeTeam: FlexibleTeamForHeader;
}) {
  const homeTeamDisplayName = homeTeam.name?.default || homeTeam.commonName?.default || homeTeam.abbrev;
  const awayTeamDisplayName = awayTeam.name?.default || awayTeam.commonName?.default || awayTeam.abbrev;

  return (
    <>
      <h2 className="text-xl font-bold mb-2">
        {homeTeamDisplayName} vs. {awayTeamDisplayName}
      </h2>
      <p className="text-gray-700">
        Score: {homeTeam.score} - {awayTeam.score}
        {lastPeriod === "REG"
          ? " (Final)"
          : lastPeriod === "OT"
            ? " (Final/OT)"
            : lastPeriod === "SO"
              ? " (Final/SO)"
              : "(Unknown)"}
      </p>
    </>
  );
}
