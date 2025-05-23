import axios from "axios";
import { type LoaderFunctionArgs } from "react-router";

const API_URL = "http://backend:8080";

type FavoriteGamesServiceData = {
  gameIds: string[];
  currentPage: number;
  totalPages: number;
  totalGames: number;
};

export async function FavoriteListService(headers: string | null, page: number, limit: number) {
    try {
      const favoriteGamesResponse: FavoriteGamesServiceData = await axios.get(
        `${API_URL}/favoritegames?page=${page}&limit=${limit}`, 
        { headers: {"Cookie": headers}}
      ).then((res) => res.data);
      return favoriteGamesResponse;
    } catch (error) {
      console.error("Error fetching favorite games:", error);
      throw error;
    }
}



