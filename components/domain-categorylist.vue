<template>
  <div :key="`category-list-${bookmarkStore.domainIndex}-${forceRerender}`">
    <draggable
      class="m-y3 pt-0 flex flex-col items-center justify-center"
      :list="selectedData[bookmarkStore.domainIndex].categoryList"
      item-key="id"
      handle=".group__handle"
      drag-class="dragging"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
      }"
      v-bind="draggableOptions"
      @start="handleStart"
      @end="handleDragEnd"
    >
      <template #item="{ element: group, index: i }">
        <div class="flex gap-x-0 py-15px w-1200px">
          <div
            class="w-[140px] h-[55px]"
            :class="{
              'mr2 bg-gray-800 border border-[#80808080] border-dashed rounded-md cursor-pointer': sessionStore.isSetting,
            }"
            @click="handleCategoryClick(i)"
          >
            <div h-55px text-18px select-none flex items-center justify-center class="group__handle">
              {{ group.name }}
            </div>
          </div>

          <draggable
            :list="selectedData[bookmarkStore.domainIndex].categoryList[i].siteList"
            item-key="id"
            group="site"
            class="grid grid-cols-7 gap-2"
            handle=".site__handle"
            drag-class="dragging"
            :component-data="{
              tag: 'div',
              type: 'transition-group',
            }"
            v-bind="draggableOptions"
            @start="handleStart"
            @end="handleDragEnd"
          >
            <template #item="{ element: site, index }: { element: Site, index: number }">
              <div class="site__handle">
                <SiteItemCard
                  :key="site.id"
                  :site="site"
                  :class="{
                    'border-gray-800 border-dashed': sessionStore.isSetting,
                  }"
                  @click="event => handleSiteClick(i, index, event)"
                />
              </div>
            </template>
          </draggable>

          <NButton
            v-if="sessionStore.isSetting"
            h-32px
            w-32px
            my-2
            strong
            circle
            tertiary
            type="primary"
            @click="modalStore.showModal('add', 'site')"
          >
            <NIcon i-mdi:add :size="48" />
          </NButton>
        </div>
      </template>
    </draggable>

    <n-button
      v-if="sessionStore.isSetting"
      w-full
      strong
      secondary
      type="primary"
      @click="modalStore.showModal('add', 'category')"
    >
      <NIcon i-mdi:add :size="32" />
    </n-button>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { NButton, NIcon } from 'naive-ui'
import SiteItemCard from '~/components/site-card.vue'
import { useBookmarkStore } from '~/store/bookmarks'
import { useModalStore } from '~/store/modal'
import { useSessionStore, useSettingStore } from '~/store/setting'
import type { Site } from '~/utils/types'

const modalStore = useModalStore()
const bookmarkStore = useBookmarkStore()
const settingStore = useSettingStore()
const sessionStore = useSessionStore()
const forceRerender = ref(0)

const selectedData = computed(() => {
  if (settingStore.websitePreference === 'default') {
    return JSON.parse(JSON.stringify(bookmarkStore.data))
  }

  return bookmarkStore.customData
})

const { draggableOptions, handleStart, handleEnd } = useDrag()

onMounted(() => {
  window.addEventListener('domain-changed', handleDomainChange)
})

onUnmounted(() => {
  window.removeEventListener('domain-changed', handleDomainChange)
})

function handleDomainChange() {
  forceRerender.value += 1
}

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

function handleDragEnd() {
  handleEnd()
  settingStore.custom()
}

function handleCategoryClick(index: number) {
  if (!sessionStore.isSetting) {
    return
  }

  bookmarkStore.categoryIndex = index
  modalStore.showModal('update', 'category')
}

function handleSiteClick(groupIndex: number, siteIndex: number, event: Event) {
  if (!sessionStore.isSetting) {
    return
  }

  event.preventDefault()
  modalStore.showModal('update', 'site', groupIndex, siteIndex)
}
</script>

<style scoped>
.ghost {
  visibility: hidden;
}
</style>
