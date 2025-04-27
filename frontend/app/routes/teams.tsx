import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { standingsLoader } from "../loaders/standingsLoader";

export const loader = standingsLoader;

export default function Teams({ params }: LoaderFunctionArgs) {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return <div>Error loading teams</div>;
  }

  return (
    <main className="flex pt-16 pb-4 items-center gap-3 relative justify-center h-screen">
      <ul className="flex flex-col items-center">
        {data.map((team) => (
          <li key={team.teamName.default}>
            {team.teamName.default} - {team.wins} - {team.losses} - {team.clinchIndicator}
          </li>
        ))}
      </ul>
    </main>
  );
}
