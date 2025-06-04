import { type GameLandingData } from "~/entities";

export function GameInformation(landingData: GameLandingData) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 border-b pb-2">Game Details</h3>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(landingData.gameDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "America/New_York",
              })}
            </p>
            <p>
              <span className="font-semibold">Start Time (ET):</span>{" "}
              {new Date(landingData.startTimeUTC).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "America/New_York",
                hour12: true,
              })}
            </p>
            {landingData.venue && landingData.venue.default && (
              <p>
                <span className="font-semibold">Venue:</span> {landingData.venue.default}
                {landingData.venueLocation?.default && (
                  <span className="text-gray-600 dark:text-gray-400">
                    {" "}
                    ({landingData.venueLocation.default})
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
  );
}