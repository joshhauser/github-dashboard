<script setup lang="ts">
  import { Client } from '@/shared/client';
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import { Utils } from '@/shared/utils';
  import Stat from '@/components/Stat.vue';
  import { GITHUB_PAGINATION_HEADER_REGEX as GITHUB_PAGINATION_TOTAL_REGEX } from '@/shared/constants';

  const userInfo = ref<any>({});
  const repositoriesCount = ref<number>(0);
  let reposToFetch: boolean = true;
  const languages = ref<any>({});
  const repositories = ref<any[]>([]);
  const topLanguage = ref();

  const fetchRepositories = async () => {
    let page: number = 1;
    let totalPage: number = -1;

    while (reposToFetch) {
      const response = await Client.getUserRepositories(100, page);
      if (!response.data) {
        return;
      }
      repositories.value.push(...response.data);

      repositories.value.forEach(async (repo) => {
        if (repo.owner.login == 'joshhauser') {
          const _response = await Client.getRepositoryLanguages(
            repo.owner.login,
            repo.name
          );

          if (_response) {
            Object.entries(_response.data).forEach(([key, value]) => {
              languages.value[key] = languages.value[key]
                ? languages.value[key] + value
                : value;
            });
          }
        }
      });

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
  };

  onMounted(() => {
    Client.getUserInfo().then((res) => {
      userInfo.value = res.data;
    });

    fetchRepositories();
  });
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <div class="lg:w-[50%]">
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
                <span class="text-md text-gray-500"
                  >(@{{ userInfo.login }})</span
                >
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
    </div>
  </div>
</template>

<style scoped>
  #avatar {
    height: 100px;
    width: 100px;
  }
</style>
