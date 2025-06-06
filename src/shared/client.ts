import type { AxiosInstance } from 'axios';
import { RestClient } from '@/shared/rest-client';

export class Client {
  static apiClient: AxiosInstance = RestClient.getInstance().apiClient;

  //TODO: create models to replace all 'any' types

  static getUserInfo() {
    return this.apiClient.get<any>('/user');
  }

  static getUserRepositories(perPage: number = 1, page: number = 1) {
    return this.apiClient.get<any>(
      `/user/repos?per_page=${perPage}&type=all&page=${page}`
    );
  }

  static getRepositoryLanguages(
    repositoryOwner: string,
    repositoryName: string
  ) {
    return this.apiClient.get<any>(
      `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/languages`
    );
  }
}
