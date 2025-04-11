import { FavoriteService } from "~/services/backendServices/favoriteService";

export const favoritegamesLoader = async () => {
  try {
    return await FavoriteService.getFavoriteList();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
