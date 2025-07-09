import { getTopSkaters } from "~/services/nhlApiServices/topskatersService";
import type { TopSkaters } from "~/entities";

export const topskatersLoader = async (): Promise<TopSkaters> => {
  try {
    return await getTopSkaters();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
