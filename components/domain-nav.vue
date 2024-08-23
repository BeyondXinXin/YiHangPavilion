<template>
    <client-only>

        <div flex flex-row items-center justify-center>
            <draggable w-[1200px] m-20px pt-5 class="flex flex-row items-center justify-center" :list="selectedData"
                item-key="id" :component-data="{
                    tag: 'div',
                    type: 'transition-group',
                }" v-bind="draggableOptions" @start="handleStart" @end="handleDragEnd">

                <template #item="{ element: cate, index: i }">
                    <div class="px-2px py-2px mx-8px my-8px cursor-pointer select-none max-w-[120px] text-center"
                        text-20px
                        :class="[{ 'text-c_highlight border-orange border-b-2': bookmarkStore.domainIndex === i }]"
                        @click="handleCateClick(i)">
                        {{ cate.name }}
                    </div>
                </template>

            </draggable>

            <NButton v-if="sessionStore.isSetting" @click="modalStore.showModal('add', 'domain')" border h-24px w-24px
                ml-2 strong circle tertiary type="primary">
                <NIcon i-mdi:add :size="20" />
            </NButton>
        </div>


    </client-only>
</template>

<script setup lang="ts">
import { useBookmarkStore } from '~/store/bookmarks'
import { useSessionStore, useSettingStore } from '~/store/setting'
import { useModalStore } from '~/store/modal'
import draggable from 'vuedraggable'
import { NButton, NIcon } from 'naive-ui'



const modalStore = useModalStore()
const bookmarkStore = useBookmarkStore()
const settingStore = useSettingStore()
const sessionStore = useSessionStore()

const selectedData = computed(() => {
    if (settingStore.websitePreference === 'default') {
        return JSON.parse(JSON.stringify(bookmarkStore.data))
    } else {
        return bookmarkStore.customData
    }
});

const { draggableOptions, handleStart, handleEnd } = useDrag()

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


function handleCateClick(dragIndex: number) {
    if (sessionStore.isSetting && bookmarkStore.domainIndex === dragIndex)
        modalStore.showModal('update', 'domain')
    else
        bookmarkStore.domainIndex = dragIndex
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