import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { bettingLinesLoader } from "../loaders/bettingLinesLoader";

export const loader = bettingLinesLoader;

export default function Players({ params }: LoaderFunctionArgs) {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return <div>Error loading betting lines</div>;
  }

  return (
    <main className="flex flex-col items-center pt-16 pb-4">
      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-3xl font-bold text-center mb-4">Betting Partner</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p>Name: {data.bettingPartner.name}</p>
              <p>Country: {data.bettingPartner.country}</p>
              <a
                href={data.bettingPartner.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Visit Site
              </a>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Games</h2>
          <ul className="flex flex-col gap-4">
            {data.games.map((game) => (
              <li key={game.gameId} className="border p-4 rounded">
                <p>
                  <strong>Game ID:</strong> {game.gameId}
                </p>
                <p>
                  <strong>Start Time:</strong> {new Date(game.startTimeUTC).toLocaleString()}
                </p>
                <div className="flex gap-8">
                  <div>
                    <h3 className="font-bold">Home Team</h3>
                    <p>{game.homeTeam.name.default}</p>
                    <img
                      src={game.homeTeam.logo}
                      alt={game.homeTeam.name.default}
                      className="w-12 h-12"
                    />
                    <ul>
                      {game.homeTeam.odds.map((odd, index) => (
                        <li key={index}>
                          {odd.description}: {odd.value} ({odd.qualifier})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold">Away Team</h3>
                    <p>{game.awayTeam.name.default}</p>
                    <img
                      src={game.awayTeam.logo}
                      alt={game.awayTeam.name.default}
                      className="w-12 h-12"
                    />
                    <ul>
                      {game.awayTeam.odds.map((odd, index) => (
                        <li key={index}>
                          {odd.description}: {odd.value} ({odd.qualifier})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
