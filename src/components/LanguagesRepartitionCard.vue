<script lang="ts" setup>
  import { useGithubDataStore } from '@/shared/store/github-data.store';
  import { Utils } from '@/shared/utils';
  import { ref, onMounted, watch } from 'vue';

  const githubDataStore = useGithubDataStore();

  const isLoading = ref<boolean>(true);
  const chartDataConfig = ref();
  const chartOptions = ref();

  watch(
    () => githubDataStore.languages,
    (n, o) => {
      if (n.length > 0) {
        chartDataConfig.value = setData();
        chartOptions.value = setOptions();
        isLoading.value = false;
      }
    }
  );

  const setOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );

    return {
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'white',
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: 'white',
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  };

  const setData = () => {
    const dataConfig: { labels: string[]; datasets: any[] } = {
      labels: [],
      datasets: [
        {
          label: 'Language usage',
          borderWidth: 1,
        },
      ],
    };

    const datasetValues: number[] = [];
    const bgColors: string[] = [];
    const borderColors: string[] = [];
    githubDataStore.languages.forEach((lang) => {
      dataConfig.labels.push(lang.language);
      datasetValues.push(lang.usage);
      const color = generateColor();
      bgColors.push(color.background);
      borderColors.push(color.border);
    });

    dataConfig.datasets[0].data = datasetValues;
    dataConfig.datasets[0].backgroundColor = bgColors;
    dataConfig.datasets[0].borderColor = borderColors;

    return dataConfig;
  };

  const generateColor = () => {
    const r = Utils.inclusiveRandInt(0, 255);
    const g = Utils.inclusiveRandInt(0, 255);
    const b = Utils.inclusiveRandInt(0, 255);
    return {
      background: `rgba(${r}, ${g}, ${b}, 0.5)`,
      border: `rgb(${r}, ${g}, ${b})`,
    };
  };
</script>

<template>
  <Skeleton v-if="isLoading" height="400px" class="w-full" />
  <Card v-else>
    <template #title>Repositories languages distribution</template>
    <template #content>
      <Chart type="bar" :data="chartDataConfig" :options="chartOptions" />
    </template>
  </Card>
</template>
