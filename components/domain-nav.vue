<template>
  <div flex flex-row items-center justify-center>
    <draggable
      w-[1200px]
      m-20px
      pt-5
      class="flex flex-row items-center justify-center"
      :list="selectedData"
      item-key="id"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
      }"
      v-bind="draggableOptions"
      @start="handleStart"
      @end="handleDragEnd"
    >
      <template #item="{ element: cate, index: i }">
        <div
          class="px-2px py-2px mx-8px my-8px cursor-pointer select-none max-w-[120px] text-center"
          text-20px
          :class="[{ 'text-c_highlight border-orange border-b-2': bookmarkStore.domainIndex === i }]"
          @click="handleCateClick(i)"
        >
          {{ cate.name }}
        </div>
      </template>
    </draggable>

    <NButton
      v-if="sessionStore.isSetting"
      border
      h-24px
      w-24px
      ml-2
      strong
      circle
      tertiary
      type="primary"
      @click="modalStore.showModal('add', 'domain')"
    >
      <NIcon i-mdi:add :size="20" />
    </NButton>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { NButton, NIcon } from 'naive-ui'
import { useBookmarkStore } from '~/store/bookmarks'
import { useModalStore } from '~/store/modal'
import { useSessionStore, useSettingStore } from '~/store/setting'

const modalStore = useModalStore()
const bookmarkStore = useBookmarkStore()
const settingStore = useSettingStore()
const sessionStore = useSessionStore()

const selectedData = computed(() => {
  if (settingStore.websitePreference === 'default') {
    return JSON.parse(JSON.stringify(bookmarkStore.data))
  }

  return bookmarkStore.customData
})

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
  if (sessionStore.isSetting && bookmarkStore.domainIndex === dragIndex) {
    modalStore.showModal('update', 'domain')
    return
  }

  const oldIndex = bookmarkStore.domainIndex
  bookmarkStore.setDomainIndex(dragIndex)
  if (oldIndex !== dragIndex) {
    window.dispatchEvent(new CustomEvent('domain-changed', {
      detail: { oldIndex, newIndex: dragIndex },
    }))
  }
}

function handleDragEnd() {
  handleEnd()
  settingStore.custom()
}
</script>

<style scoped>
.ghost {
  visibility: hidden;
}
</style>
