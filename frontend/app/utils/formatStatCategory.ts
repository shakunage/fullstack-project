export const formatStatCategory = (category: string): string => {
  switch (category) {
    case "goalsSh":
      return "Short Handed Goals";
    case "plusMinus":
      return "Plus/Minus";
    case "assists":
      return "Assists";
    case "goalsPp":
      return "Power Play Goals";
    case "faceoffLeaders":
      return "Faceoff %";
    case "penaltyMins":
      return "Penalty Minutes";
    case "goals":
      return "Goals";
    case "points":
      return "Points";
    case "toi":
      return "Time On Ice";
    default:
      return category.charAt(0).toUpperCase() + category.slice(1);
  }
};
