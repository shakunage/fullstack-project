import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';

const API_URL = process.env.CSR_BACKEND_URL || 'http://localhost/backend';

export async function checkAuthStatus(): Promise<boolean> {
  const fetchOptions: GenericFetchOptions<boolean> = {
    method: 'GET',
    endpoint: `${API_URL}/authcheck`,
    dataTransform: async (response) => {
      if (response.status !== 200) {
        return false;
      }
      return (await response.json()) as boolean;
    },
    defaultValue: false,
    credentials: 'include', // Ensure cookies are sent with the request
  };
  try {
    const authcheckResponse: boolean = await genericFetch(fetchOptions);
    return authcheckResponse;
  } catch (error) {
    console.error('Error fetching auth status:', error);
    throw error;
  }
}

export async function logoutUser(): Promise<string | boolean> {
  const fetchOptions: GenericFetchOptions<boolean> = {
    method: 'GET',
    endpoint: `${API_URL}/logout`,
    dataTransform: async (response) => (await response.json()) as boolean,
    defaultValue: false,
    credentials: 'include', // Ensure cookies are sent with the request
  };
  try {
    const logoutResponse: boolean = await genericFetch(fetchOptions);
    return logoutResponse;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}
