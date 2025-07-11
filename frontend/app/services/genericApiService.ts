export type GenericFetchOptions<T> = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  dataTransform: (response: Response) => Promise<T>;
  defaultValue: T;
  queryParameter?: string;
  body?: object;
  headers?: Record<string, string>;
  credentials?: 'omit' | 'same-origin' | 'include';
};

export async function genericFetch<T>({
  method,
  endpoint,
  queryParameter,
  dataTransform,
  defaultValue,
  body = {}, // Default to an empty object for body
  headers = {}, // Default to an empty object for headers
  credentials = 'omit',
}: GenericFetchOptions<T>): Promise<T> {
  let url = `${endpoint}`;
  if (queryParameter) {
    url += `?${queryParameter}`;
  }

  const fetchConfig: RequestInit = {
    method: method,
    headers: {
      ...headers, // User-provided headers will override defaults if keys match
    },
    credentials,
  };

  // Set Content-Type for relevant methods if a body is provided and not already set
  if (body && (method === 'POST' || method === 'PUT')) {
    fetchConfig.body = JSON.stringify(body);
    if (!headers['Content-Type'] && !headers['content-type']) {
      fetchConfig.headers = { ...fetchConfig.headers, 'Content-Type': 'application/json' };
    }
  }

  try {
    console.debug(`[API Request] ${method} ${url}`, body ? { body } : {});
    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      let errorPayload: unknown = `Status: ${response.status}`; // Default error payload
      try {
        // Attempt to parse error response body for more details
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorPayload = await response.json();
        } else {
          errorPayload = await response.text();
        }
      } catch (e) {
        // If parsing the error body fails, stick with the status text
        console.warn(`Could not parse error response body for ${method} ${url}`, e);
      }

      console.error(`[API Error] ${method} ${url} - Status: ${response.status}`, {
        request: { endpoint, method, body, queryParameter, headers },
        responseStatus: response.status,
        errorResponse: errorPayload,
      });
      return defaultValue; // Return the default value on HTTP error
    }

    return await dataTransform(response);
  } catch (error) {
    console.error(`[API Fetch Error] Network or parsing error for ${method} ${url}:`, {
      request: { endpoint, method, body, queryParameter, headers },
      errorDetails: error instanceof Error ? error.message : String(error),
      errorObject: error,
    });
    return defaultValue; // Return the default value on network/parsing error
  }
}
