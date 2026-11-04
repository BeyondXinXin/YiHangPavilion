<template>
  <div :class="sessionStore.isBookmarksOpen ? 'flex min-h-0 w-full flex-1 flex-col' : 'flex w-full flex-1 flex-col items-center justify-center pb-[30vh]'">
    <BookmarksPage v-if="sessionStore.isBookmarksOpen" />
    <template v-else>
      <MainClock />
      <AggregatedSearch />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import MainClock from '~/components/clock.vue'
import AggregatedSearch from '~/components/search.vue'
import { useSessionStore } from '~/store/setting'

const BookmarksPage = defineAsyncComponent(() => import('~/components/bookmarks.vue'))
const sessionStore = useSessionStore()
</script>
