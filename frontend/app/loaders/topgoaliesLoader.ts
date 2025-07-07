import { getTopGoalies } from "../services/nhlApiServices/topgoaliesService";
import type { TopGoalies } from "~/entities";

export const topgoaliesLoader = async (): Promise<TopGoalies> => {
  try {
    return await getTopGoalies();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
