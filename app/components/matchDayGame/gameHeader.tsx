import type { GameItem } from "../../entities/GameItem";

export function GameHeader({ game }: { game: GameItem }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">
        {game.homeTeam.name.default} vs. {game.awayTeam.name.default}
      </h2>
      <p className="text-gray-700">
        Score: {game.homeTeam.score} - {game.awayTeam.score}
        {game.gameOutcome.lastPeriodType === "REG"
          ? " (Final)"
          : game.gameOutcome.lastPeriodType === "OT"
            ? " (Final - OT)"
            : game.gameOutcome.lastPeriodType === "SO"
              ? " (Final - SO)"
              : "(Unknown)"}
      </p>
      <p className="text-gray-700">Start Time: {new Date(game.startTimeUTC).toLocaleString()}</p>
      <p className="text-gray-700">Venue: {game.venue.default}</p>
    </>
  );
}
