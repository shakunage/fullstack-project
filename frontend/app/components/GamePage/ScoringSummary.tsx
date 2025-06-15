import { type GameStory } from "~/entities";

export function ScoringSummary(gameLandingData: GameStory) {
  return (
    <>
      {gameLandingData.summary?.scoring && gameLandingData.summary.scoring.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Scoring Summary</h3>
          {gameLandingData.summary.scoring.map((period) => (
            <div key={period.periodDescriptor.number} className="mb-4">
              <h4 className="text-xl font-semibold mb-2">
                Period {period.periodDescriptor.number}
                {period.periodDescriptor.periodType !== "REG" &&
                  ` (${period.periodDescriptor.periodType})`}
              </h4>
              {period.goals.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {period.goals.map((goal) => (
                    <li key={goal.eventId} className="py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            src={
                              goal.teamAbbrev.default === gameLandingData.homeTeam.abbrev
                                ? gameLandingData.homeTeam.logo
                                : gameLandingData.awayTeam.logo
                            }
                            alt={`${goal.teamAbbrev.default} logo`}
                            className="h-8 w-8 mr-3"
                          />
                          <div>
                            <p className="font-semibold">
                              {goal.teamAbbrev.default} Goal: {goal.name.default} ({goal.goalsToDate})
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {goal.shotType} at {goal.timeInPeriod}
                              {goal.strength !== "ev" && ` (${goal.strength.toUpperCase()})`}
                              {goal.goalModifier !== "none" && ` (${goal.goalModifier})`}
                            </p>
                            {goal.assists.length > 0 && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Assists:{" "}
                                {goal.assists
                                  .map((assist) => `${assist.name.default} (${assist.assistsToDate})`)
                                  .join(", ")}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-lg font-bold">
                          {goal.awayScore} - {goal.homeScore}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No goals in this period.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
