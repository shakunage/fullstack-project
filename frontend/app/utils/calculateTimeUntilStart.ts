export const calculateTimeUntilStart = (gameStartTime: string, now: Date = new Date()) => {
  const startTime = new Date(gameStartTime);
  const diff = startTime.getTime() - now.getTime();

  if (diff <= 0) {
    return `Game will begin momentarily – scheduled to start at ${gameStartTime}`;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 1) {
    return `${days} days ${hours} hours`;
  }

  if (days === 1) {
    return `1 day ${hours} hours`;
  }

  if (days < 1) {
    return `${hours} hours ${minutes} minutes`;
  }
};
