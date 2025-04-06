import { useState } from "react"
import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import type { LoaderFunctionArgs } from "react-router";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { matchDayLoader } from "../data/matchDayLoader";
import { MatchDayGames } from "../components/MatchDayGames";

export const loader = matchDayLoader;

export default function GameByDate({ params }: LoaderFunctionArgs) {
  
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const currentDatePST = moment().tz("America/Los_Angeles").startOf("day").toDate();

  const [selectedDate, setSelectedDate] = useState<Date>(
    params.date ? new Date(params.date) : currentDatePST
  );

  const handleDateChange = (date: Date | null): void => {
    if (date) {
      const pacificDate: Date = moment(date).tz("America/Los_Angeles").toDate();
      setSelectedDate(pacificDate);
      const formattedDate: string = moment(pacificDate).format("YYYY-MM-DD");
      void navigate(`/games/${formattedDate}`);
    }
  };

  const changeDateQuery = useQuery({
    queryKey: ["changeDate", selectedDate],
    queryFn: async () => {
      const formattedDate: string = moment(selectedDate).format("YYYY-MM-DD");
      await navigate(`/games/${formattedDate}`);
      return "Date changed";
    },
  });

  return (
    <main className="flex pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
        <div className="relative w-full">
          {changeDateQuery.isLoading && (
            <div className="spinner border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin absolute top-[-2rem] left-1/2 transform -translate-x-1/2"></div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const previousDay = moment(selectedDate).subtract(1, "day").toDate();
              handleDateChange(previousDay);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            {'◀︎'}
          </button>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="border p-2 rounded"
          />
          <button
            onClick={() => {
              const nextDay = moment(selectedDate).add(1, "day").toDate();
              handleDateChange(nextDay);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            {'▶︎'}
          </button>
        </div>
        <p />
        {params.date ? <>{data.length} games scheduled for {params.date}</> : <>{data.length} games scheduled for today</>}
        <p></p>
        <MatchDayGames />
      </div>
    </main>
  );
}
