// services/api/favoriteService.ts
import axios from "axios";

const API_URL = "http://localhost:9998/backend";

export const FavoriteService = {
  checkFavorite: async (gameId: string) => {
    try {
      const response = await axios.get(`${API_URL}/favorite?id=${gameId}`, { withCredentials: true });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },
  
  addFavorite: async (gameId: string) => {
    return axios.post(`${API_URL}/favorite?id=${gameId}`, {}, { withCredentials: true });
  },
  
  removeFavorite: async (gameId: string) => {
    return axios.delete(`${API_URL}/favorite?id=${gameId}`, { withCredentials: true });
  }
};