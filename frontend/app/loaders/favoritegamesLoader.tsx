import axios from "axios";

export const favoritegamesLoader = async () => {
  try {
    const response = await axios.get<string[]>(`http://localhost:9998/backend/favoritegames`, { withCredentials: true });
    const favoriteGames: string[] = response.data;
    return favoriteGames;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
