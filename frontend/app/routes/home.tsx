import { MatchDayGames } from "../components/MatchDayGames";
import { matchDayLoader } from "../loaders/matchDayLoader";

export const loader = matchDayLoader;

export default function Home() {
  return (
    <main className="flex pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
        Today's Matches:
        <p></p>
        <MatchDayGames />
      </div>
    </main>
  );
}
