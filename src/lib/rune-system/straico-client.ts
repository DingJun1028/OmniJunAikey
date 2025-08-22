/**
 * Straico AI API Client (TypeScript)
 *
 * This module provides a client for interacting with the Straico AI API.
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { STRAICO_API_KEY, STRAICO_API_BASE_URL } from '@/lib/config';
// Note: In a Node.js environment (like Next.js server-side), we might need FormData
// For now, we'll use the browser's built-in FormData if available, or require the library.
// This client is intended for server-side use in Next.js, so we'll use the library.
import FormData from 'form-data';


// A generic type for API responses
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiResponse = Promise<any>;

export class StraicoClient {
  private client: AxiosInstance;

  constructor(apiKey: string = STRAICO_API_KEY, baseURL: string = STRAICO_API_BASE_URL) {
    if (!apiKey) {
      throw new Error('Straico API key is required.');
    }

    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Generic request handler for JSON-based requests
  private async _request<T>(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, ...rest: any[]): Promise<T> {
    try {
      const response = await this.client[method]<T>(endpoint, ...rest);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(`[StraicoClient] API Error: ${axiosError.response?.status} ${axiosError.message}`);
      throw axiosError;
    }
  }

  // --- Model Information ---
  public async getModels(): ApiResponse {
    return this._request('get', '/v1/models');
  }

  // --- RAG ---
  public async createRagBase(params: {
    name: string;
    files: { stream: NodeJS.ReadableStream; filename: string }[];
    // ... other params
  }): ApiResponse {
    const form = new FormData();
    form.append('name', params.name);
    // Append other params as needed...

    for (const file of params.files) {
      form.append('files', file.stream, file.filename);
    }

    try {
      const response = await this.client.post('/v0/rag', form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(`[StraicoClient] RAG Creation Error: ${axiosError.response?.status} ${axiosError.message}`);
      throw axiosError;
    }
  }

  // --- Agents ---
  public async createAgent(params: {
    name: string;
    prompt: string;
    llm_model: string;
  }): ApiResponse {
    return this._request('post', '/v0/agent', params);
  }

  public async promptAgent(agentId: string, prompt: string): ApiResponse {
    return this._request('post', `/v0/agent/${agentId}/prompt`, { prompt });
  }
}
