import { type GenericFetchOptions, genericFetch } from "~/services/genericApiService";
import isValidDate from "~/utils/isValidDate";

const API_URL = "http://reverseproxy:9998/api/v1/score";

// server side call to the nhl api
export async function getPreviousMatchDayDate(game_date: string | undefined): Promise<string> {
  const fetchOptions: GenericFetchOptions<string> = {
    method: "GET",
    endpoint: `${API_URL}/${game_date}`,
    dataTransform: async (response) => {
      const fullResponseData = await response.json();
      if (fullResponseData.prevDate) {
        return fullResponseData.prevDate;
      } else {
        console.error("Match day games data prevDate property is invalid:", fullResponseData);
        return "unknown";
      }
    },
    defaultValue: "unknown",
  };
  try {
    // validate date input
    if (!isValidDate(fetchOptions.endpoint.slice(38, ))) return "unknown";
    const prevMatchDay: string = await genericFetch(fetchOptions);
    if (!isValidDate(prevMatchDay)) return "unknown";

    return prevMatchDay;
  } catch (error) {
    console.error("Error fetching match day date:", error);
    throw error;
  };
};

// client side call to the resource route
export async function fetchPreviousMatchDayDate(game_date: string | undefined): Promise<string> {
  const fetchOptions: GenericFetchOptions<string> = {
    method: "GET",
    endpoint: `/resources/prevMatchDate/${game_date}`,
    dataTransform: async (response) => {
      const responseDate = await response.json();
      if (responseDate) {
        return responseDate;
      } else {
        console.error("Match day games data prevDate property is invalid:", responseDate);
        return "unknown";
      }
    },
    defaultValue: "unknown",
  };
  try {
    // validate date input
    if (!isValidDate(fetchOptions.endpoint.slice(25, ))) return "unknown";
    const prevMatchDay: string = await genericFetch(fetchOptions);
    if (!isValidDate(prevMatchDay)) return "unknown";

    return prevMatchDay;
  } catch (error) {
    console.error("Error fetching match day date:", error);
    throw error;
  };
};
