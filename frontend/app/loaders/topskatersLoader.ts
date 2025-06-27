import { getTopSkaters } from "../services/nhlApiServices/topskatersService";

export const topskatersLoader = async () => {
  try {
    return await getTopSkaters();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
