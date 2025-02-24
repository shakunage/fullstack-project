import type { GameItem } from "../../entities/GameItem";

export function GoalScorers({ game }: { game: GameItem }) {
  return (
    <>
      <h3 className="text-lg font-bold">Goal Scorers</h3>
      <div>
        <h4 className="font-semibold">Home Team</h4>
        {game.goals
          .filter((goal) => goal.teamAbbrev === game.homeTeam.abbrev)
          .map((goal) => (
            <p key={`${goal.period}_${goal.timeInPeriod}`}>
              {goal.name.default} - {goal.goalsToDate} goals
            </p>
          ))}
      </div>
      <div>
        <h4 className="font-semibold">Away Team</h4>
        {game.goals
          .filter((goal) => goal.teamAbbrev === game.awayTeam.abbrev)
          .map((goal) => (
            <p key={`${goal.period}_${goal.timeInPeriod}`}>
              {goal.name.default} - {goal.goalsToDate} goals
            </p>
          ))}
      </div>
    </>
  );
}
