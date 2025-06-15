import { type GameStory } from "~/entities";

export function ThreeStars(landingData: GameStory) {
  return (
    <>
      {landingData.summary?.threeStars && landingData.summary.threeStars.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Three Stars of the Game</h3>
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
                    alt={star.name}
                    className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                  />
                  <p className="text-lg font-semibold">
                    {star.star}
                    {star.star === 1 ? "st" : star.star === 2 ? "nd" : "rd"} Star
                  </p>
                  <p className="font-bold">{star.name}</p>
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
    </>
  );
}
