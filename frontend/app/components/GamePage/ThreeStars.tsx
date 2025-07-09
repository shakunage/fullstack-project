import { useState } from "react";
import { type GameStory } from "~/entities";

export function ThreeStars(landingData: GameStory) {
  const [showThreeStars, setShowThreeStars] = useState(false);

  const handleToggleThreeStars = () => {
    setShowThreeStars(!showThreeStars);
  };

  if (!landingData.summary?.threeStars || landingData.summary.threeStars.length === 0) {
    return null; // Don't render anything if there are no three stars
  }

  // Helper function to handle the two different name formats
  const getPlayerName = (player: any) => {
    if (typeof player.name === "string") {
      return player.name;
    }
    return player.name.default;
  };

  return (
    <div className="w-full mt-6">
      <button
        onClick={handleToggleThreeStars}
        className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-xl font-semibold focus:outline-none"
      >
        Three Stars {showThreeStars ? "▲" : "▼"}
      </button>
      {showThreeStars && (
        <div className="mt-4">
          {/* Original content was here, now wrapped. The h3 title is part of the button now. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {landingData.summary.threeStars
              .sort((a, b) => a.star - b.star)
              .map((star) => (
                <div
                  key={star.playerId}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow text-center"
                >
                  <img
                    src={star.headshot}
                    alt={getPlayerName(star)}
                    className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                  />
                  <p className="text-lg font-semibold">
                    {star.star}
                    {star.star === 1 ? "st" : star.star === 2 ? "nd" : "rd"} Star
                  </p>
                  <p className="font-bold">{getPlayerName(star)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {star.teamAbbrev} - {star.position}
                  </p>
                  <p className="text-sm">
                    {star.goals}G, {star.assists}A, {star.points}P
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
