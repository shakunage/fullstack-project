import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';

const API_URL = 'http://localhost:9998/backend/login';

type LoginResponse = {
  token: string;
};

export async function loginService(email: string, password: string): Promise<string | false> {
  const fetchOptions: GenericFetchOptions<string | false> = {
    method: 'POST',
    endpoint: API_URL,
    dataTransform: async (response) => {
      const data = (await response.json()) as LoginResponse;
      return data.token;
    },
    defaultValue: false,
    body: { email, password },
  };
  try {
    return await genericFetch(fetchOptions);
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
}
