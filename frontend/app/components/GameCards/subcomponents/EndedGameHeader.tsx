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
  otPeriods = 0, // Default to 0 if not provided
}: {
  lastPeriod: string;
  awayTeam: FlexibleTeamForHeader;
  homeTeam: FlexibleTeamForHeader;
  otPeriods?: number; // Optional, default to 0
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
          : lastPeriod === "OT" && otPeriods < 2
            ? " (Final/OT)"
            : lastPeriod === "OT" && otPeriods > 1
              ? ` (Final/${otPeriods}OT)`
              : lastPeriod === "SO"
                ? " (Final/SO)"
                : " (Unknown)"}
      </p>
    </>
  );
}
