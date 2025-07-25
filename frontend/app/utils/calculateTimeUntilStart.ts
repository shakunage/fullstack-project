import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

export const calculateTimeUntilStart = (gameStartTime: string) => {
  const now = dayjs().tz('America/New_York');
  const start = dayjs(gameStartTime).tz('America/New_York');
  const diff = start.diff(now);

  if (diff <= 0) {
    return 'Game will begin momentarily';
  }

  const days = start.diff(now, 'day');
  const hours = start.diff(now, 'hour') % 24;
  const minutes = start.diff(now, 'minute') % 60;

  if (days > 1) {
    return `${days} days ${hours} hours`;
  }

  if (days === 1) {
    return `1 day ${hours} hours`;
  }

  if (hours > 0) {
    return `${hours} hours ${minutes} minutes`;
  }

  return `${minutes} minutes`;
};
