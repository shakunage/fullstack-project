import { useState } from "react";
import DatePicker from "react-datepicker";
import type { LoaderFunctionArgs } from "react-router";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import { matchDayLoader } from "../data/matchDayLoader";
import { MatchDayGames } from "../components/matchDayGames";

export const loader = matchDayLoader;

export default function GameByDate({ params }: LoaderFunctionArgs) {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      navigate(`/games/${formattedDate}`);
    }
  };

  return (
    <main className="flex pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="border p-2 rounded"
        />
        <p/>
        {params ? 
          (<>Games for {params.date}</>)
          : 
          (<>Games for today</>)
        }
        <p></p>
        <MatchDayGames />
      </div>
    </main>
  );
}
