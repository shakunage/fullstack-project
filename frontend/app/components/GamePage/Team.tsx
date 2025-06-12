import type { GameLandingData } from '~/entities';
export function Team({landingData, home}: {landingData: GameLandingData, home: boolean}) {
  const teamData = home ? landingData.homeTeam : landingData.awayTeam;

  return (
    <div className="flex items-center w-full mb-2">
        <img
        src={teamData.logo}
        alt={`${teamData.commonName.default} logo`}
        className="h-12 w-12 md:h-16 md:w-16 mr-3 md:mr-4"
        />
        <div className="flex-grow">
        {teamData.placeName && (
            <p className="text-md md:text-lg">{teamData.placeName.default}</p>
        )}
        <h2 className="text-xl md:text-2xl font-bold">{teamData.commonName.default}</h2>
        </div>
        <p className="text-3xl md:text-4xl font-bold">{teamData.score}</p>
    </div>
  );
}