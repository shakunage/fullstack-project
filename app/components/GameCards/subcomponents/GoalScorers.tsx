import type { GameItem } from "../../../entities/GameItem";

const TeamGoalScorers = ({ game, home }: {game: GameItem, home: boolean}) => {
  const teamName: string = home ? game.homeTeam.name.default : game.awayTeam.name.default;
  const teamAbbrev: string = home ? game.homeTeam.abbrev : game.awayTeam.abbrev;
  return (
    <div>
      <h4 className="font-semibold">{teamName}</h4>
      {game.goals
        .filter((goal) => goal.teamAbbrev === teamAbbrev)
        .map((goal) => (
          <p key={`${goal.period}_${goal.timeInPeriod}`}>
            {goal.name.default} - {goal.goalsToDate} goals
          </p>
        ))}
    </div>
  )
}

export function GoalScorers({ game }: { game: GameItem }) {
  return (
    <>
      <h3 className="text-lg font-bold">Goal Scorers</h3>
      <TeamGoalScorers game={game} home={true} />
      <br/>
      <TeamGoalScorers game={game} home={false} />
    </>
  );
}