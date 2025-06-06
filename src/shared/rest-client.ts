import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@/shared/constants';

export class RestClient {
  apiClient: AxiosInstance;
  publicClient: AxiosInstance;

  private static instance: RestClient | null = null;

  private constructor() {
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_GITHUB_PERSONAL_TOKEN,
      },
    });

    // Create client without parameters to avoid preflight on request that doesn't need any authorization
    this.publicClient = axios.create();
  }

  public static getInstance(): RestClient {
    if (!RestClient.instance) {
      RestClient.instance = new RestClient();
    }

    return RestClient.instance;
  }
}
