<script setup lang="ts">
  import LanguagesRepartitionCard from '@/components/LanguagesRepartitionCard.vue';
  import MainCard from '@/components/MainCard.vue';
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <div class="lg:w-[50%] flex flex-col gap-6">
      <MainCard />
      <LanguagesRepartitionCard />
    </div>
  </div>
</template>
