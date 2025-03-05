import { PlayVideoButton } from "../../icons/PlayVideoButton";

export function EndedGameDetails({ threeMinRecapLink, condensedGameLink }: { threeMinRecapLink: string, condensedGameLink: string }) {
  return (
    <>
      <p className="text-gray-700 flex items-center">
        Watch Quick Recap (3 min)
        <a
          href={`https://www.nhl.com${threeMinRecapLink}`}
          className="text-blue-500 hover:underline flex items-center ml-2"
        >
          <PlayVideoButton />
        </a>
      </p>
      <p className="text-gray-700 flex items-center">
        Watch Condensed Game (10 min)
        <a
          href={`https://www.nhl.com${condensedGameLink}`}
          className="text-blue-500 hover:underline flex items-center ml-2"
        >
          <PlayVideoButton />
        </a>
      </p>
    </>
  );
}
