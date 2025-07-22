import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';

const API_URL = 'http://localhost:9998/backend';

type LoginResponse = {
  message: string;
};

export async function loginService(email: string, password: string): Promise<boolean> {
  const fetchOptions: GenericFetchOptions<boolean> = {
    method: 'POST',
    endpoint: `${API_URL}/login`,
    dataTransform: async (response) => {
      if (response.ok) {
        const data = (await response.json()) as LoginResponse;
        console.log('Response from loginService:', data.message);
        return true;
      }
      return false;
    },
    defaultValue: false,
    body: { email, password },
    credentials: 'include',
  };
  try {
    return await genericFetch(fetchOptions);
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
}
