<template>
    <footer class="pt-2 w-full flex flex-row justify-between items-center relative">
        <!-- Left Side (Empty Placeholder) -->
        <div class="flex-1"></div>

        <!-- Centered Record Link -->
        <div v-if="settingStore.isShowFooter"
            class="absolute left-1/2 transform -translate-x-1/2 text-sm text-center select-none op-50">
            <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2023033867号</a>
        </div>

        <!-- Right Side Icons and Button -->
        <div class="flex flex-row items-center space-x-4 text-3">
            <a v-if="settingStore.isShowFooter" i-simple-icons:bilibili
                href="https://space.bilibili.com/285016963?spm_id_from=333.1007.0.0" target="_blank"></a>
            <a v-if="settingStore.isShowFooter" i-simple-icons-github href="https://github.com/BeyondXinXin"
                target="_blank"></a>

            <button v-if="isNavigationPage && sessionStore.isSetting" @click="toggleSetting(false)"
                i-icon-park-outline:home />
            <RouterLink v-if="isNavigationPage && !sessionStore.isSetting" to="/navigation" button
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

// Determine if the current route is "/navigation"
const isNavigationPage = computed(() => route.path === '/navigation')

</script>
