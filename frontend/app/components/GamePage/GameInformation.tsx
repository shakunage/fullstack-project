import { type GameStory } from "~/entities";

export function GameInformation(data: GameStory) {
  return (
    <div className="md:w-1/2 pt-2 md:pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 border-b pb-2">Game Details</h3>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(data.gameDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "America/New_York",
            })}
          </p>
          <p>
            <span className="font-semibold">Start Time (ET):</span>{" "}
            {new Date(data.startTimeUTC).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "America/New_York",
              hour12: true,
            })}
          </p>
          {data.venue && data.venue.default && (
            <p>
              <span className="font-semibold">Venue:</span> {data.venue.default}
              {data.venueLocation?.default && (
                <span className="text-gray-600 dark:text-gray-400"> ({data.venueLocation.default})</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
