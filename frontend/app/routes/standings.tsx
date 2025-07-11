import { useState } from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { standingsLoader } from '~/loaders/standingsLoader';
import { type StandingsItem } from '~/entities/StandingsItem';
import Spinner from '~/components/icons/Spinner';
import { StandingsTable } from '~/components/Standings/StandingsTable';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
import DatePickerComponent from '~/components/DatePicker';
import isValidDate from '~/utils/isValidDate';
import { useMemo } from 'react';

export const loader = standingsLoader;

export default function Standings({ params }: LoaderFunctionArgs) {
  const data: StandingsItem[] = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoadingData = navigation.state === 'loading';

  // Group standings by conference and then by division
  const groupedStandings = useMemo(() => {
    if (!data) return {};
    return data.reduce(
      (acc, team) => {
        const { conferenceName, divisionName } = team;
        if (!acc[conferenceName]) {
          acc[conferenceName] = {};
        }
        if (!acc[conferenceName][divisionName]) {
          acc[conferenceName][divisionName] = [];
        }
        // Sort teams within division by divisionSequence
        acc[conferenceName][divisionName].push(team);
        acc[conferenceName][divisionName].sort((a, b) => a.divisionSequence - b.divisionSequence);
        return acc;
      },
      {} as Record<string, Record<string, StandingsItem[]>>
    );
  }, [data]);

  const [selectedDate, setSelectedDate] = useState<Date>(
    params.date && isValidDate(params.date)
      ? new Date(params.date)
      : dayjs().tz('America/Los_Angeles').startOf('day').toDate()
  );

  const handleDateChange = (date: Date | string | null): void => {
    if (date) {
      const pacificDate: Date = dayjs(date).tz('America/Los_Angeles').toDate();
      setSelectedDate(pacificDate);
      const formattedDate: string = dayjs(pacificDate).format('YYYY-MM-DD');
      void navigate(`/standings/${formattedDate}`);
    }
  };

  if (!data || data.length === 0) {
    const date = params.date || 'unknown date';
    return (
      <main className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold text-center mb-4">NHL Standings</h1>
        <DatePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
        <div className="pt-16 text-center mb-15">
          <p className="text-lg mb-4">Standings data not found for {date}.</p>
          <button
            onClick={() => {
              navigate('/standings');
              setSelectedDate(dayjs().tz('America/Los_Angeles').startOf('day').toDate());
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Click here to return to latest standings
          </button>
        </div>
      </main>
    );
  }

  // Sort conferences: Eastern first, then Western (adjust if names differ)
  const conferenceOrder = ['Eastern', 'Western'];
  const sortedConferences = Object.keys(groupedStandings).sort((a, b) => {
    return conferenceOrder.indexOf(a) - conferenceOrder.indexOf(b);
  });

  return (
    <main className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold text-center mb-4">NHL Standings</h1>
      <DatePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
      <div className="relative w-full">
        {isLoadingData && <Spinner />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedConferences.map((conferenceName) => (
            <StandingsTable
              conferenceStandings={conferenceName}
              groupedStandings={groupedStandings}
              key={conferenceName}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
