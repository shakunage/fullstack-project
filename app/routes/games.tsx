import { useState } from "react";
import DatePicker from "react-datepicker";
import type { LoaderFunctionArgs } from "react-router";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { matchDayLoader } from "../data/matchDayLoader";
import { MatchDayGames } from "../components/MatchDayGames";

export const loader = matchDayLoader;

export default function GameByDate({ params }: LoaderFunctionArgs) {
  const currentDateET = moment().tz("America/Los_Angeles").startOf("day").toDate();
  const [selectedDate, setSelectedDate] = useState<Date>(
    params.date ? new Date(params.date) : currentDateET
  );
  const navigate = useNavigate();

  const handleDateChange = (date: Date | null): void => {
    if (date) {
      setSelectedDate(date);
      const easternDate: Date = moment(date).tz("America/New_York").toDate();
      setSelectedDate(easternDate);
      const formattedDate: string = moment(easternDate).format("YYYY-MM-DD");
      void navigate(`/games/${formattedDate}`);
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
        <p />
        {params.date ? <>Games for {params.date}</> : <>Games for today</>}
        <p></p>
        <MatchDayGames />
      </div>
    </main>
  );
}
