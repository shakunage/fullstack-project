import type { LoaderFunctionArgs } from "react-router";

export default function Game({ params }: LoaderFunctionArgs) {
  const { game_id } = params;
  console.log("Game ID:", game_id);
  return (
    <main className="flex pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
        Individual game details
        <p></p>
        {game_id}
      </div>
    </main>
  );
}
