import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';
const API_URL = 'http://localhost:9998/backend/signup';

export async function signupServiceService(
  name: string,
  email: string,
  password: string
): Promise<string | false> {
  const GenericFetchOptions: GenericFetchOptions<string> = {
    method: 'POST',
    endpoint: API_URL,
    dataTransform: async (response) => response.json() as Promise<string>,
    defaultValue: '',
    body: {
      name,
      email,
      password,
    },
  };
  try {
    const token: string = await genericFetch(GenericFetchOptions);
    return token;
  } catch (error) {
    console.error('Error during signup:', error);
    return false; // Return false on error
  }
}
