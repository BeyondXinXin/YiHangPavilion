<template>
  <div class="w-[1200px]">
    <MainClock />
    <AggregatedSearch />
    <Favorites />
  </div>
</template>

<script setup>
import AggregatedSearch from '~/components/aggregated-search.vue';
import MainClock from '~/components/simple-clock.vue'
import Favorites from '~/components/favorites';
</script>
