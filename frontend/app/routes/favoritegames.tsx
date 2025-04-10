import React from "react";
import { useLoaderData } from "react-router";
import { favoritegamesLoader } from "~/loaders/favoritegamesLoader";

export const clientLoader = favoritegamesLoader;

export default  function GameByDate() {
  const data = useLoaderData<typeof clientLoader>();

  if (!data) {
    return <div>Error loading favorite games</div>;
  }
  
  return (
    <main className="flex pt-16 pb-4 items-center gap-3 relative justify-center h-screen">
      <ul className="flex flex-col items-center">
      {data.map((favoritegameId) => (
        <li key={favoritegameId}>
          {favoritegameId}
        </li>
      ))}
      </ul>
    </main>
  );
}
