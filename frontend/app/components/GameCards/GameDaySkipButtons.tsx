export function GameDaySkipButtons({
  prevDate,
  nextDate,
  isLoading,
  handleDateChange,
}: {
  prevDate: string | undefined;
  nextDate: string | undefined;
  isLoading: boolean;
  handleDateChange: (date: string) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      {prevDate !== undefined && prevDate !== 'unknown' && (
        <button
          onClick={() => handleDateChange(prevDate)}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 pl-8 w-64"
          disabled={isLoading}
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 10% 100%, 0% 50%, 10% 0)',
          }}
        >
          {isLoading ? 'Loading...' : 'Previous match day'}
        </button>
      )}
      {nextDate && nextDate !== 'unknown' && (
        <button
          onClick={() => handleDateChange(nextDate)}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 pr-8 w-64"
          disabled={isLoading}
          style={{
            clipPath: 'polygon(90% 0, 100% 50%, 90% 100%, 0 100%, 0 0)',
          }}
        >
          {isLoading ? 'Loading...' : 'Next match day'}
        </button>
      )}
    </div>
  );
}
