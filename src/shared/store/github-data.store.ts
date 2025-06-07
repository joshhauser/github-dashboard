import { defineStore } from 'pinia';
import type { LanguageUsage } from '../models';

export const useGithubDataStore = defineStore('githubData', {
  state: (): {
    languages: LanguageUsage[];
  } => {
    return {
      languages: [],
    };
  },
});
