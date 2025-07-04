export const formatStatValue = (category: string, value: number | string): string => {
  if (category === "faceoffLeaders" && typeof value === "number") return `${(value * 100).toFixed(1)}%`;
  if (category === "toi" && typeof value === "number") {
    const totalSeconds = Math.floor(value); // Ensure we start with whole seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60; // This will now be an integer
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return String(value);
};
