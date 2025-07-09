import { useLoaderData } from "react-router";
import { MatchDayGames } from "~/components/MatchDayGames";
import { matchDayLoader } from "~/loaders/matchDayLoader";

export const loader = matchDayLoader;

export default function Home() {
  const data = useLoaderData<typeof loader>();
  return (
    <main className="flex pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
        Recent matches:
        <p></p>
        <MatchDayGames games={data.games} />
      </div>
    </main>
  );
}
