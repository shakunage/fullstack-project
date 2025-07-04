import { useState } from "react";
import { type GameStory } from "~/entities";

export function ScoringSummary(gameLandingData: GameStory) {
  const [showScoringSummary, setShowScoringSummary] = useState(true); // Default open

  const handleToggleScoringSummary = () => {
    setShowScoringSummary(!showScoringSummary);
  };

  if (!gameLandingData.summary?.scoring || gameLandingData.summary.scoring.length === 0) {
    return null; // Don't render anything if there is no scoring data
  }

  return (
    <div className="w-full mt-6">
      <button
        onClick={handleToggleScoringSummary}
        className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-xl font-semibold focus:outline-none"
      >
        Scoring Summary {showScoringSummary ? "▲" : "▼"}
      </button>
      {showScoringSummary && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-b-md">
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
    </div>
  );
}
