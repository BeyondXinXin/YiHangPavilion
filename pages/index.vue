<template>
  <div class="w-[1200px]">
    <AggregatedSearch />
    <div class="flex justify-center pt-10">
      <div class="grid grid-cols-5 gap-4">
        <SiteItemCard v-for="link in bookmarkStore.getGeneral" :key="link.link" :link="link" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AggregatedSearch from '~/components/aggregated-search.vue';
import SiteItemCard from '~/components/site-item-card.vue';
import { useBookmarkStore } from '~/store/bookmarks';

const bookmarkStore = useBookmarkStore();
bookmarkStore.initializeBookmarks();

</script>
