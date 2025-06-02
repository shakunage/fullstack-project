import type { GameLandingData } from "../../entities";

const API_BASE_URL = "http://reverseproxy:9998/api/v1";

// Generic data fetching function using Fetch API
async function fetchData<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Attempt to get more details from the response body if possible
      let errorDetails = `HTTP error! status: ${response.status}`;
      try {
        const errorBody = await response.json(); // Or response.text() if not JSON
        errorDetails += `, Body: ${JSON.stringify(errorBody)}`;
      } catch (e) {
        // Ignore if response body cannot be parsed
      }
      console.error(`Error fetching data from ${url}: ${errorDetails}`);
      throw new Error(`Failed to fetch data from ${endpoint}. ${errorDetails}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    // This will catch network errors or errors from the !response.ok block
    console.error(`An unexpected error occurred fetching data from ${url}:`, error);
    // Re-throw the error to be handled by the caller
    // Or, ensure a more specific error message is thrown if it's a generic Error from above
    if (error instanceof Error && error.message.startsWith('Failed to fetch data')) {
        throw error;
    }
    throw new Error(`Failed to fetch data from ${endpoint} due to a network or parsing error.`);
  }
}

// API call to get game landing data, implementing the generic fetchData
export async function getLanding(game_id: string | undefined): Promise<GameLandingData> {
  if (!game_id) {
    // It's good practice to throw an error or return a rejected promise if critical params are missing
    return Promise.reject(new Error("Game ID is required to fetch landing data."));
  }
  const endpoint = `/gamecenter/${game_id}/landing`;
  return fetchData<GameLandingData>(endpoint);
}
