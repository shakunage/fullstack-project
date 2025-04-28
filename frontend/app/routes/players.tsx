import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { topskatersLoader } from "../loaders/topskatersLoader";

export const loader = topskatersLoader;

export default function Players({ params }: LoaderFunctionArgs) {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return <div>Error loading players</div>;
  }

  return (
    <main className="flex pt-16 pb-4 items-center gap-3 relative justify-center h-screen">
      <ul className="flex flex-col items-center">
        {Object.entries(data).map(([category, skaters]) => (
          <li key={category}>
            <h2 className="font-bold text-lg">{category}</h2>
            <ul>
              {skaters.map((skater) => (
                <li key={skater.id}>
                  {skater.firstName.default} {skater.lastName.default} - {skater.position} -{" "}
                  {skater.teamName.default} - {skater.value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
