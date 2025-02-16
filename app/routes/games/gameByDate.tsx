import { matchDayLoader } from "../../data/matchDayLoader"
import { MatchDayGames } from "../../components/matchDayGames";

export const loader = matchDayLoader;

export default function GameByDate() {
  return (
  <main className="flex pt-16 pb-4">
    <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
      Today's Matches:
      <p></p>
      <MatchDayGames />
    </div>
  </main>
  )
}
