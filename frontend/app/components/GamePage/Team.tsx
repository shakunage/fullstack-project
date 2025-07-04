import type { GameStory } from "~/entities";
export function Team({ storyData, home }: { storyData: GameStory; home: boolean }) {
  const teamData = home ? storyData.homeTeam : storyData.awayTeam;

  return (
    <div className="flex items-center w-full mb-2">
      <img
        src={teamData.logo}
        alt={`${teamData.name.default} logo`}
        className="h-12 w-12 md:h-16 md:w-16 mr-3 md:mr-4"
      />
      <div className="flex-grow">
        {teamData.placeName && <p className="text-md md:text-lg">{teamData.placeName.default}</p>}
        <h2 className="text-xl md:text-2xl font-bold">{teamData.name.default}</h2>
      </div>
      <p className="text-3xl md:text-4xl font-bold">{teamData.score}</p>
    </div>
  );
}
