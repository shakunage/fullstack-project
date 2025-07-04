import { useState } from "react";
import { useGameLanding } from "~/hooks/useGameLanding";
import Spinner from "~/components/icons/Spinner";

export function PenaltiesDropdown({ game_id }: { game_id: number }) {
  const [showPenalties, setShowPenalties] = useState(false);

  const { fetchedLandingData, refetchLanding, isFetchingLanding, landingError } =
    useGameLanding(game_id);

  const handleTogglePenalties = async () => {
    if (!showPenalties && !fetchedLandingData && !isFetchingLanding) {
      // If opening, no data yet, and not already fetching
      try {
        await refetchLanding();
      } catch (error) {
        console.error("Failed to fetch landing data:", error);
        // Optionally set an error state here to display to the user
      }
    }
    setShowPenalties(!showPenalties);
  };

  return (
    <>
      <div className="w-full mt-6">
        <button
          onClick={handleTogglePenalties}
          className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-xl font-semibold focus:outline-none disabled:opacity-50"
          disabled={isFetchingLanding}
        >
          Penalty Summary {showPenalties ? "▲" : "▼"}
        </button>
      </div>
      {/* Loading Indicator for Landing */}
      {isFetchingLanding && <Spinner />}
      {/* Error Message for Landing Fetch */}
      {landingError && !isFetchingLanding && (
        <div className="mt-4 text-red-500 text-center">
          <p>Error loading penalty summary: {landingError.message}</p>
        </div>
      )}

      {showPenalties &&
        fetchedLandingData?.summary?.penalties &&
        fetchedLandingData.summary.penalties.length > 0 && (
          <div className="mt-4 mb-8">
            {" "}
            {/* Added mt-4 for spacing when dropdown is open */}
            {fetchedLandingData.summary.penalties.map((period) => (
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
                      const drawnByText = penalty.drawnBy ? `on ${penalty.drawnBy.default} ` : "";
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
                            {penalty.servedBy && <>{servedByText}</>}
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
