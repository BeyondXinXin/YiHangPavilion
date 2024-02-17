<template>
  <div class="w-[1200px]">
    <AggregatedSearch />
    <div class="flex flex-col gap-12 relative pl-40 pt-10">
      <div class="flex flex-wrap gap-6">
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
