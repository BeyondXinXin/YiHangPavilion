<template>
    <footer class="pt-2 w-full flex flex-row justify-between items-center relative">
        <!-- Left Side (Empty Placeholder) -->
        <div class="flex-1"></div>

        <!-- Centered Record Link -->
        <div class="absolute left-1/2 transform -translate-x-1/2 text-sm text-center select-none op-50">
            <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2023033867号</a>
        </div>

        <!-- Right Side Icons and Button -->
        <div class="flex flex-row items-center space-x-4 text-3">
            <button v-if="isNavigationPage && sessionStore.isSetting" @click="toggleSetting(false)"
                i-icon-park-outline:home />
            <RouterLink v-if="isNavigationPage && !sessionStore.isSetting" to="/" button
                @click="toggleSetting(true)" i-icon-park-outline:setting-config />
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useSettingStore, useSessionStore } from '~/store/setting'
import { RouterLink, useRoute } from 'vue-router'

const sessionStore = useSessionStore()
const settingStore = useSettingStore()
const route = useRoute()

function toggleSetting(value: boolean) {
    sessionStore.isSetting = value
}

const isNavigationPage = computed(() => route.path === '/')

</script>
