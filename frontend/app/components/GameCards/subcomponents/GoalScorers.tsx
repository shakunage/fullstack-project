import type { GameLandingData } from "~/entities";
import { resolveNameType } from "~/utils/resolveNameType";

const TeamGoalScorers = ({ game, home }: { game: GameLandingData; home: boolean }) => {
  const teamName: string = home ? resolveNameType(game.homeTeam) : resolveNameType(game.awayTeam);
  const teamAbbrev: string = home ? game.homeTeam.abbrev : game.awayTeam.abbrev;

  const teamGoals = game.summary.scoring.flatMap((goal) =>
    goal.goals.filter((goal) => goal.teamAbbrev.default === teamAbbrev)
  );

  if (teamGoals.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="font-semibold">{teamName}</h4>
      {teamGoals.map((goal) => (
        <p key={`${goal.eventId}_${goal.timeInPeriod}`}>
          {goal.name.default} - {goal.goalsToDate} goals
        </p>
      ))}
    </div>
  );
};

export function GoalScorers({ game }: { game: GameLandingData }) {
  return (
    <>
      <h3 className="text-lg font-bold">Goal Scorers</h3>
      <TeamGoalScorers game={game} home={true} />
      <br />
      <TeamGoalScorers game={game} home={false} />
    </>
  );
}
