/**
 * A generic POST helper for calling our backend API routes.
 * @param endpoint The API endpoint to call (e.g., '/api/flow/menu').
 * @param body The payload to send to the endpoint.
 * @returns The JSON response from the API.
 */
export async function callApi<T>(endpoint: string, body: unknown): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Try to parse the error response for more details
      const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.message}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to call API endpoint "${endpoint}":`, error);
    // Re-throw the error to be handled by the calling component
    throw error;
  }
}

// Example usage for a specific flow:
//
// interface MenuFlowRequest {
//   prompt: string;
// }
//
// interface MenuFlowResponse {
//   result: string;
// }
//
// export const callMenuFlow = (prompt: string) => {
//   return callApi<MenuFlowResponse>('/api/flow/menu', { prompt });
// };
