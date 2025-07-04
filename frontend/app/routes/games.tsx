import { useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { matchDayLoader } from "~/loaders/matchDayLoader";
import { MatchDayGames } from "~/components/MatchDayGames";
import isValidDate from "~/utils/isValidDate";
import DatePickerComponent from "~/components/DatePicker";
import { GameDaySkipButtons } from "~/components/GameCards/GameDaySkipButtons";
import Spinner from "~/components/icons/Spinner";

dayjs.extend(utc);
dayjs.extend(timezone);

export const loader = matchDayLoader;

export default function GameByDate({ params }: LoaderFunctionArgs) {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoadingData = navigation.state === "loading";

  const [selectedDate, setSelectedDate] = useState<Date>(
    params.date && isValidDate(params.date)
      ? new Date(params.date)
      : isValidDate(data.currentDate)
        ? dayjs(data.currentDate).tz("America/Los_Angeles").toDate()
        : dayjs().tz("America/Los_Angeles").startOf("day").toDate()
  );

  const handleDateChange = (date: Date | string | null): void => {
    if (date) {
      const pacificDate: Date = dayjs(date).tz("America/Los_Angeles").toDate();
      setSelectedDate(pacificDate);
      const formattedDate: string = dayjs(pacificDate).format("YYYY-MM-DD");
      void navigate(`/games/${formattedDate}`);
    }
  };

  return (
    <main className="flex flex-col items-center pt-16 pb-4 gap-4">
      <div className="flex items-center gap-2">
        <DatePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
      </div>
      <div className="relative w-full mt-5">
        {isLoadingData && <Spinner />}
        <>
          <div className="flex flex-col items-center gap-4 min-h-0">
            {data.games.length} games scheduled for {data.currentDate}
            <p></p>
            {data.games.length === 0 && (
              <GameDaySkipButtons
                prevDate={data.prevDate}
                nextDate={data.nextDate}
                isLoading={isLoadingData}
                handleDateChange={handleDateChange}
              />
            )}
          </div>
          <MatchDayGames games={data.games} />
        </>
      </div>
    </main>
  );
}
