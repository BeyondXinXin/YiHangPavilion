<template>
    <client-only>
        <NConfigProvider :theme="theme">
            <div flex flex-row items-center justify-center>
                <draggable w-[1200px] m-20px pt-5 class="flex flex-row items-center justify-center" :list="selectedData"
                    item-key="id" :component-data="{
                        tag: 'div',
                        type: 'transition-group',
                    }" v-bind="draggableOptions" @start="handleStart" @end="handleDragEnd">

                    <template #item="{ element: cate, index: i }">
                        <div class="px-2px py-2px mx-8px my-8px cursor-pointer select-none max-w-[120px] text-center"
                            text-20px :class="[{ 'text-c_highlight border-orange border-b-2': curIndex === i }]"
                            @click="handleCateClick(i)">
                            {{ cate.name }}
                        </div>
                    </template>

                </draggable>

                <NButton v-if="sessionStore.isSetting" border h-24px w-24px ml-2 strong circle tertiary type="primary">
                    <NIcon i-mdi:add :size="20" />
                </NButton>
            </div>



            <draggable class="m-20px pt-0 flex flex-col items-center justify-center"
                :list="selectedData[curIndex].categoryList" item-key="id" handle=".group__handle" drag-class="dragging"
                :component-data="{
                    tag: 'div',
                    type: 'transition-group',
                }" v-bind="draggableOptions" @start="handleStart" @end="handleDragEnd">

                <template #item="{ element: group, index: i }">
                    <div class="flex gap-x-0 py-15px w-1200px">

                        <div w-100px h-55px px-0 text-18px select-none flex items-center justify-center
                            class="group__handle">
                            {{ group.name }}
                        </div>

                        <draggable :list="selectedData[curIndex].categoryList[i].siteList" item-key="id" group="site"
                            class="grid grid-cols-7 gap-2" handle=".site__handle" drag-class="dragging" :component-data="{
                                tag: 'div',
                                type: 'transition-group',
                            }" v-bind="draggableOptions" @start="handleStart" @end="handleDragEnd">
                            <template #item="{ element: site, index }: { element: Site, index: number }">
                                <div class="site__handle">
                                    <SiteItemCard :key="site.id" :site="site" />
                                </div>
                            </template>
                        </draggable>

                        <NButton v-if="sessionStore.isSetting" h-32px w-32px my-2 strong circle tertiary type="primary">
                            <NIcon i-mdi:add :size="48" />
                        </NButton>

                    </div>
                </template>
            </draggable>

            <n-button w-full strong secondary type="primary">
                <NIcon i-mdi:add :size="32" />
            </n-button>

            <n-button w-full h-20 strong mt-4 secondary type="error">
                <NIcon i-mdi:delete :size="32" />
            </n-button>

        </NConfigProvider>
    </client-only>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import SiteItemCard from '~/components/site-card.vue'
import { useBookmarkStore } from '~/store/bookmarks'
import { useSessionStore, useSettingStore } from '~/store/setting'
import { darkTheme, NConfigProvider, NInput, NButton, NIcon, NSpace, NIconWrapper } from 'naive-ui'
const bookmarkStore = useBookmarkStore()
const settingStore = useSettingStore()
const sessionStore = useSessionStore()
const theme = ref(darkTheme)

const selectedData = computed(() => {
    if (settingStore.websitePreference === 'default') {
        return JSON.parse(JSON.stringify(bookmarkStore.data))
    } else {
        return bookmarkStore.customData
    }
});

const curIndex = ref(0);

function useDrag() {
    const draggableOptions = computed(() => ({
        animation: 200,
        ghostClass: 'ghost',
        chosenClass: 'chosen',
        forceFallback: true,
        fallbackTolerance: 3,
        disabled: !sessionStore.isSetting,
    }))

    function handleStart() {
        document.body.style.cursor = 'pointer'
    }
    function handleEnd() {
        document.body.style.cursor = ''
    }

    return {
        draggableOptions,
        handleStart,
        handleEnd,
    }
}

const { draggableOptions, handleStart, handleEnd } = useDrag()

function handleCateClick(dragIndex: number) {
    curIndex.value = dragIndex
}

function handleDragEnd(e: any) {
    handleEnd()
    settingStore.custom()
    const { oldIndex, newIndex } = e
}

</script>

<style scoped>
.ghost {
    visibility: hidden;
}
</style>