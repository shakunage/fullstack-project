import { useLoaderData } from "react-router";
import { topgoaliesLoader } from "../loaders/topgoaliesLoader";
import { type TopGoalies, type GoalieStat } from "../entities/TopGoalies"; // Import GoalieStat
import { GoalieTable } from "../components/Goalies/GoalieTable"; // Import the GoalieTable component

export const loader = topgoaliesLoader;

export default function Goalies() {
  const data: TopGoalies = useLoaderData<typeof loader>();

  if (!data) {
    return <div className="text-center text-red-500 mt-10">Error loading goalies data.</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 pt-20 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-900">Top NHL Goalies</h1>
      <GoalieTable title="Top Goalies by Wins" goalies={data.wins} statKey="wins" />
      <GoalieTable title="Top Goalies by Shutouts" goalies={data.shutouts} statKey="shutouts" />
      <GoalieTable title="Top Goalies by Save Percentage" goalies={data.savePctg} statKey="savePctg" />
      <GoalieTable title="Top Goalies by Goals Against Average" goalies={data.goalsAgainstAverage} statKey="goalsAgainstAverage" />
¥    </div>
  );
}
