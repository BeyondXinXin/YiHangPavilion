<template>
  <footer class="relative flex w-full flex-row items-center justify-between pt-2">
    <div class="flex-1"></div>

    <div class="absolute left-1/2 -translate-x-1/2 select-none text-center text-sm op-50">
      <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2023033867号</a>
    </div>

    <div class="flex flex-row items-center space-x-4 text-3">
      <button
        v-if="isNavigationPage && sessionStore.isBookmarksOpen"
        title="返回首页"
        class="i-icon-park-outline:home bg-current op-70 transition-opacity hover:op-100"
        @click="toggleBookmarks(false)"
      />
      <button
        v-else-if="isNavigationPage"
        title="收藏"
        class="i-icon-park-outline:setting-config bg-current op-70 transition-opacity hover:op-100"
        @click="toggleBookmarks(true)"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSessionStore } from '~/store/setting'

const sessionStore = useSessionStore()
const route = useRoute()

function toggleBookmarks(value: boolean) {
  sessionStore.isBookmarksOpen = value
}

const isNavigationPage = computed(() => route.path === '/')
</script>
