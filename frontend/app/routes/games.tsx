import { useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router";
import DatePicker from "react-datepicker";
import type { LoaderFunctionArgs } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { matchDayLoader } from "../loaders/matchDayLoader";
import { MatchDayGames } from "../components/MatchDayGames";
import isValidDate from "~/utils/isValidDate";

export const loader = matchDayLoader;

export default function GameByDate({ params }: LoaderFunctionArgs) {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const [selectedDate, setSelectedDate] = useState<Date>(
    params.date && isValidDate(params.date)
      ? new Date(params.date)
      : isValidDate(data.currentDate)
        ? moment(data.currentDate).tz("America/Los_Angeles").toDate()
      : moment().tz("America/Los_Angeles").startOf("day").toDate()
  );

  const handleDateChange = (date: Date | string | null): void => {
    if (date) {
      const pacificDate: Date = moment(date)
        .tz("America/Los_Angeles")
        .toDate();
      setSelectedDate(pacificDate);
      const formattedDate: string = moment(pacificDate).format("YYYY-MM-DD");
      void navigate(`/games/${formattedDate}`);
    }
  };

  return (
    <main className="flex pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
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
        <div className="relative w-full mt-5">
          {isLoading ? (
            <div className="mb-50 mt-15">
              <div className="spinner border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin absolute top-[-2rem] left-1/2 transform -translate-x-1/2"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center gap-4 min-h-0 flex items-center">
                {params.date ? (
                  <>{data.games.length} games scheduled for {params.date}</>
                ) : (
                  <>{data.games.length} games scheduled for today</>
                )}
                <p></p>
                {data.games.length === 0 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDateChange(data.prevDate)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 pl-8 w-64"
                    disabled={isLoading}
                    style={{ clipPath: 'polygon(100% 0, 100% 100%, 10% 100%, 0% 50%, 10% 0)' }}
                  >
                    {isLoading
                      ? "Loading..."
                      : "Previous match day"}
                  </button>
                  {data.nextDate !== "unknown" && (
                    <button
                      onClick={() => handleDateChange(data.nextDate)}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 pr-8 w-64"
                      disabled={isLoading}
                      style={{ clipPath: 'polygon(90% 0, 100% 50%, 90% 100%, 0 100%, 0 0)' }}
                    >
                      {isLoading
                        ? "Loading..."
                        : "Next match day"}
                    </button>
                  )}
                </div>
              )}
              </div>
              <MatchDayGames />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
