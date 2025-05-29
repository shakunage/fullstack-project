export type GenericFetchOptions<T> = {
  method: ('GET' | 'POST' | 'PUT' | 'DELETE')
  endpoint: string;
  dataTransform: (response: Response) => Promise<T>;
  defaultValue: T;
  queryParameter?: string;
  body?: object;
  headers?: Record<string, string>;
}

export async function genericFetch<T>({
  method,
  endpoint,
  dataTransform,
  defaultValue,
  queryParameter,
  body,
  headers = {}, // Default to an empty object for headers
}: GenericFetchOptions<T>): Promise<T> {
  let url = `${endpoint}`;
  if (queryParameter) {
    url += `?${queryParameter}`;
  }

  const fetchConfig: RequestInit = {
    method: method,
    headers: {
      // Default headers - can be overridden or extended by the headers parameter
      // 'Content-Type' is typically needed for POST/PUT/PATCH with a JSON body
      // 'Accept' can be useful to specify expected response type
      ...headers, // User-provided headers will override defaults if keys match
    },
  };

  // Set Content-Type for relevant methods if a body is provided and not already set
  if (body && (method === 'POST' || method === 'PUT')) {
    fetchConfig.body = JSON.stringify(body);
    if (!headers['Content-Type'] && !headers['content-type']) {
      fetchConfig.headers = { ...fetchConfig.headers, 'Content-Type': 'application/json' };
    }
  }

  // For GET or DELETE, a body is not typical, and Content-Type for the request might not be needed.
  if (method === 'GET' || method === 'DELETE') {
    // If a Content-Type was set by default and isn't overridden for a GET/DELETE,
    // it might be fine, or you could explicitly remove it if it causes issues with your server.
    // delete fetchConfig.headers['Content-Type']; // Example: if you want to ensure no Content-Type
  }

  try {
    console.debug(`[API Request] ${method} ${url}`, body ? { body } : {});
    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      let errorPayload: any = `Status: ${response.status}`; // Default error payload
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

      console.error(
        `[API Error] ${method} ${url} - Status: ${response.status}`,
        {
          request: { endpoint, method, body, queryParameter, headers },
          responseStatus: response.status,
          errorResponse: errorPayload,
        }
      );
      return defaultValue; // Return the default value on HTTP error
    }

    // If response.ok, proceed to transform the data using the provided function
    // The dataTransform function is responsible for calling .json(), .text(), etc.
    return await dataTransform(response);

  } catch (error) {
    // This catches network errors (e.g., DNS resolution failure, server unreachable)
    // or errors thrown during the response.json()/text() if dataTransform fails.
    console.error(
      `[API Fetch Error] Network or parsing error for ${method} ${url}:`,
      {
        request: { endpoint, method, body, queryParameter, headers },
        errorDetails: error instanceof Error ? error.message : String(error),
        errorObject: error,
      }
    );
    return defaultValue; // Return the default value on network/parsing error
  }
}
