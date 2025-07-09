import { PlayVideoButton } from "~/components/icons/PlayVideoButton";

export function EndedGameDetails({
  threeMinRecapLink,
  condensedGameLink,
}: {
  threeMinRecapLink: string;
  condensedGameLink: string;
}) {
  return (
    <>
      {threeMinRecapLink && (
        <p className="text-gray-700 flex items-center">
          Watch Quick Recap (3 min)
          <a
            href={`https://www.nhl.com${threeMinRecapLink}`}
            className="text-blue-500 hover:underline flex items-center ml-2"
            onClick={(event) => event.stopPropagation()}
          >
            <PlayVideoButton />
          </a>
        </p>
      )}
      {condensedGameLink && (
        <p className="text-gray-700 flex items-center">
          Watch Condensed Game (10 min)
          <a
            href={`https://www.nhl.com${condensedGameLink}`}
            className="text-blue-500 hover:underline flex items-center ml-2"
            onClick={(event) => event.stopPropagation()}
          >
            <PlayVideoButton />
          </a>
        </p>
      )}
    </>
  );
}
