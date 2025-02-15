import { useLoaderData } from "react-router"
import { matchDayLoader as loader } from "../data/matchDayLoader"

export function MatchDayGames() {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No games scheduled for today</p>;
  }

  return (
    <ul>
      {data.map((game) => (
        <li key={game.id}>
          <p>Game ID: {game.id}</p>
          <p>{game.homeTeam.name.default} vs. {game.awayTeam.name.default}</p>
          <br />
        </li>
      ))}
    </ul>
    );
  }