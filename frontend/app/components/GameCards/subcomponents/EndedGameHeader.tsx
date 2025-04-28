import type { GameItem } from "../../../entities/GameItem";

export function EndedGameHeader({
  lastPeriod,
  awayTeam,
  homeTeam,
}: {
  lastPeriod: string;
  awayTeam: GameItem["awayTeam"];
  homeTeam: GameItem["homeTeam"];
}) {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">
        {homeTeam.name.default} vs. {awayTeam.name.default}
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
