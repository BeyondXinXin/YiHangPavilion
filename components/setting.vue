<template>
    <div mt16 mb4 text-18px> 设置 </div>
    <client-only>
        <n-config-provider :theme="theme">
            <div grid grid-cols-2 md="grid-cols-3" lg="grid-cols-6" justify-between gap-12>
                <Selection v-model="isShowNavBar" :options="visibilityOptions" title="显示导航栏" />
                <Selection v-model="isShowTime" :options="visibilityOptions" title="显示时间" />
                <Selection v-model="isShowFooter" :options="visibilityOptions" title="显示页脚" />
            </div>
        </n-config-provider>
    </client-only>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Selection from '~/components/selection.vue';
import { darkTheme, NConfigProvider } from 'naive-ui';
import { useSettingStore } from '~/store/setting';

const theme = ref(darkTheme);

// 获取 Pinia Store
const settingStore = useSettingStore();

// 定义可选项 "显示" 和 "隐藏"
const visibilityOptions = [
    { label: '显示', value: 1 },
    { label: '隐藏', value: 0 },
];

// 绑定到 Pinia Store 的状态
const isShowNavBar = computed({
    get: () => settingStore.isShowNavBar ? 1 : 0,
    set: (value) => settingStore.isShowNavBar = value === 1
});
const isShowTime = computed({
    get: () => settingStore.isShowTime ? 1 : 0,
    set: (value) => settingStore.isShowTime = value === 1
});
const isShowFooter = computed({
    get: () => settingStore.isShowFooter ? 1 : 0,
    set: (value) => settingStore.isShowFooter = value === 1
});


</script>