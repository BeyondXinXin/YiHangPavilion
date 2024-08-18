<template>
    <client-only>

        <draggable w-[1200px] m-20px pt-5 class="flex flex-row items-center justify-center" :list="selectedData"
            item-key="id" :component-data="{
                tag: 'div',
                type: 'transition-group',
            }" v-bind="draggableOptions" @start="handleStart" @end="handleDragEnd">
            <template #item="{ element: cate, index: i }">
                <div class="px-5px py-5px mx-8px cursor-pointer select-none max-w-[120px] text-center" text="18px"
                    :class="[{ 'text-c_highlight': curIndex === i }]"
                    @click="handleCateClick(i)">
                    {{ cate.name }}
                </div>
            </template>
        </draggable>

        <div pt-5 v-if="settingStore.isClient">
            <div grid grid-cols-8 gap-8>
                <SiteItemCard v-for="link in selectedData[curIndex].collection" :key="link.link" :link="link"
                    class="" />
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import SiteItemCard from '~/components/site-item-card.vue'
import { useBookmarkStore } from '~/store/bookmarks'
import { useSettingStore } from '~/store/setting'

const bookmarkStore = useBookmarkStore()
const settingStore = useSettingStore()

const selectedData = computed(() => {
    if (settingStore.websitePreference === 'default') {
        return JSON.parse(JSON.stringify(bookmarkStore.data))
    } else {
        return bookmarkStore.customData
    }
});

const curIndex = ref(0);

function useDrag() {
    const disabled = ref(true)
    const draggableOptions = computed(() => ({
        animation: 200,
        ghostClass: 'ghost',
        chosenClass: 'chosen',
        forceFallback: true,
        fallbackTolerance: 3,
    }))

    function handleStart() {
        disabled.value = true
        document.body.style.cursor = 'pointer'
    }
    function handleEnd() {
        if (disabled.value)
            disabled.value = false
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


function funText1() {
    settingStore.reset()
}

function funText2() {
    settingStore.custom()
}

</script>

<style scoped>
.ghost {
    visibility: hidden;
}
</style>