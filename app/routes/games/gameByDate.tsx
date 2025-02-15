import { useLoaderData } from "react-router"
import axios from 'axios'
import type { LoaderFunctionArgs } from "react-router";
import type { MatchDayData } from '../../entities';


export const loader = async ({ params }: LoaderFunctionArgs) => {
    console.log("params are:", params);
    try {
        const response = await axios.get<MatchDayData>(`http://api-web.nhle.com/v1/score/${params.date}`);
        const matchDayData: MatchDayData = response.data;
        return matchDayData.games;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data');
      }
  };

export default function GameByDate() {
    const data = useLoaderData<typeof loader>();
    return (
    <main className="flex pt-16 pb-4">
    <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
        Today's Matches:
        <p></p>
        <ul>
        {data.map((game) => (
        <li key={game.id}>
            <p>Game ID: {game.id}</p>
            <p>{game.homeTeam.name.default} vs. {game.awayTeam.name.default}</p>
            <br />
        </li>
        ))}
    </ul>
    </div>
    </main>
    )
}
