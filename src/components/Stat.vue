<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: false,
      default: () => '',
    },
  });
</script>

<template>
  <div
    class="stat shadow border-1 border-solid rounded-md border-gray-500 p-2 w-auto"
  >
    <div class="flex flex-col">
      <div class="stat-title text-[0.7rem] text-gray-400">{{ title }}</div>
      <div class="flex -mt-1">
        <div class="text-[1.75rem]">{{ value }}</div>
        <div v-if="unit != ''" class="stat-unit">{{ unit }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .stat {
    min-width: 125px;
    max-width: fit-content;
  }
</style>
