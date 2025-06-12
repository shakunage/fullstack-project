import { useState } from "react";
import { type GameLandingData } from "~/entities";

export function PenaltiesDropdown(gameLandingData: GameLandingData) {
const [showPenalties, setShowPenalties] = useState(false);
  return (
    <>
        {gameLandingData.summary?.penalties && gameLandingData.summary.penalties.length > 0 && (
            <div className="w-full mt-6">
              <button
                onClick={() => setShowPenalties(!showPenalties)}
                className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-xl font-semibold focus:outline-none"
              >
                Penalty Summary {showPenalties ? "▲" : "▼"}
              </button>
            </div>
          )}
          {showPenalties && (
              <div className="mt-4 mb-8"> {/* Added mt-4 for spacing when dropdown is open */}
                {gameLandingData.summary.penalties.map((period) => (
                  <div key={`penalty-${period.periodDescriptor.number}`} className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">
                      Period {period.periodDescriptor.number}
                      {period.periodDescriptor.periodType !== "REG" &&
                        ` (${period.periodDescriptor.periodType})`}
                    </h4>
                    {period.penalties.length > 0 ? (
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {period.penalties.map((penalty, index) => {
                          const committedByText = penalty.committedByPlayer
                            ? `${penalty.committedByPlayer.default} ー`
                            : "";
                          const drawnByText = penalty.drawnBy
                            ? `on ${penalty.drawnBy.default} `
                            : "";
                          const servedByText = penalty.servedBy
                            ? `ー served by: ${penalty.servedBy.default}`
                            : "";

                          return (
                            <li key={`${penalty.descKey}-${index}`} className="py-2">
                              <p>
                                <span className="font-semibold">
                                  {penalty.teamAbbrev.default} penalty at {penalty.timeInPeriod}
                                </span>{" "}
                                {penalty.servedBy && committedByText === "Bench" && (
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    ({servedByText})
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {committedByText} {penalty.duration} mins for {penalty.descKey} {drawnByText}
                                {penalty.servedBy && (
                                  <>
                                    {servedByText}
                                  </>
                                )}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No penalties in this period.</p>
                    )}
                  </div>
                ))}
              </div>
          )}
    </>

  );
}