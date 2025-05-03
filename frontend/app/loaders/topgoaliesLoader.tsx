import { getTopGoalies } from "../services/nhlApiServices/topgoaliesService";

export const topgoaliesLoader = async () => {
  try {
    return await getTopGoalies();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
