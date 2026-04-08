<template>
  <footer class="pt-2 w-full flex flex-row justify-between items-center relative">
    <div class="flex-1"></div>

    <div class="absolute left-1/2 transform -translate-x-1/2 text-sm text-center select-none op-50">
      <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2023033867号</a>
    </div>

    <div class="flex flex-row items-center space-x-4 text-3">
      <button v-if="isNavigationPage && sessionStore.isSetting" i-icon-park-outline:home @click="toggleSetting(false)" />
      <RouterLink
        v-if="isNavigationPage && !sessionStore.isSetting"
        to="/"
        button
        i-icon-park-outline:setting-config
        @click="toggleSetting(true)"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useSessionStore } from '~/store/setting'

const sessionStore = useSessionStore()
const route = useRoute()

function toggleSetting(value: boolean) {
  sessionStore.isSetting = value
}

const isNavigationPage = computed(() => route.path === '/')
</script>
