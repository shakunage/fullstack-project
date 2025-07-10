import { getTopSkatersService } from "~/services/nhlApiServices/topSkatersService";
import type { TopSkaters } from "~/entities";

export const topskatersLoader = async (): Promise<TopSkaters> => {
  try {
    return await getTopSkatersService();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
