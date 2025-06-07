<script lang="ts" setup>
  import { Client } from '@/shared/client';
  import { onMounted, ref } from 'vue';
  import Stat from '@/components/Stat.vue';
  import { GITHUB_PAGINATION_TOTAL_REGEX } from '@/shared/constants';

  const userInfo = ref<any>({});
  const languages = ref<any>({});
  const repositories = ref<any[]>([]);
  const topLanguage = ref('');

  const fetchRepositories = async (): Promise<any[]> => {
    let page: number = 1;
    let totalPage: number = -1;
    let reposToFetch: boolean = true;
    const _repositories: any[] = [];

    while (reposToFetch) {
      const response = await Client.getUserRepositories(100, page);
      if (!response.data) {
        return _repositories;
      }
      _repositories.push(...response.data);

      const link = response.headers.link || null;
      if (link) {
        if (totalPage == -1)
          totalPage = parseInt(
            link.match(GITHUB_PAGINATION_TOTAL_REGEX)[1],
            10
          );
      } else {
        reposToFetch = false;
      }

      if (page < totalPage) {
        page++;
      } else {
        reposToFetch = false;
      }
    }

    return _repositories;
  };

  const fetchRepositoriesLanguages = async () => {
    const _languages: { [key: string]: number } = {};

    for (const repo of repositories.value) {
      if (repo.owner.login == 'joshhauser') {
        const _response = await Client.getRepositoryLanguages(
          repo.owner.login,
          repo.name
        );

        if (_response) {
          Object.entries(_response.data).forEach(([key, value]) => {
            _languages[key] = _languages[key] ? _languages[key] + value : value;
          });
        }
      }
    }

    return _languages;
  };

  const setMostUsedLanguages = () => {
    const languagesAsArray = Object.entries(languages.value);
    const _topLanguage = languagesAsArray.reduce(
      (max: any[], current: any[]) => {
        return max[1] > current[1] ? max : current;
      },
      languagesAsArray
    );

    topLanguage.value = _topLanguage[0];
  };

  onMounted(async () => {
    Client.getUserInfo().then((res) => {
      userInfo.value = res.data;
    });

    repositories.value = await fetchRepositories();
    if (repositories.value.length > 0) {
      languages.value = await fetchRepositoriesLanguages();
      setMostUsedLanguages();
    }
  });
</script>

<template>
  <Card>
    <template #content>
      <div class="flex flex-col lg:flex-row items-center">
        <div class="mr-5">
          <img
            id="avatar"
            :src="userInfo.avatar_url"
            alt="User Github avatar"
          />
        </div>
        <div>
          <div class="flex gap-1 items-center">
            <span class="text-2xl font-bold">
              {{ userInfo.name }}
            </span>
            <span class="text-md text-gray-500">(@{{ userInfo.login }})</span>
          </div>
          <div class="flex flex-wrap text-md">
            <div>{{ userInfo.bio }}</div>
            <div v-if="userInfo.location" class="ml-1">
              &nbsp;- 📍 {{ userInfo.location }}
            </div>
          </div>
          <div class="mt-2 flex gap-3">
            <Stat
              title="Repositories"
              :value="repositories.length.toString()"
            />
            <Stat title="Top language/framework" :value="topLanguage" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
  #avatar {
    height: 100px;
    width: 100px;
  }
</style>
