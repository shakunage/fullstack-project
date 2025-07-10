import { type GenericFetchOptions, genericFetch } from "~/services/genericApiService";

const API_URL = "http://localhost:9998/backend/login";

export async function loginService(email: string, password: string): Promise<string | false> {
  const fetchOptions: GenericFetchOptions<Promise<string | false>> = {
    method: "POST",
    endpoint: API_URL,
    dataTransform: async (response) => await response.json(),
    defaultValue: Promise.resolve(false),
    body: { email, password },
  };
  try {
    const loginResponse: string | false = await genericFetch(fetchOptions);
    return loginResponse;
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
}
