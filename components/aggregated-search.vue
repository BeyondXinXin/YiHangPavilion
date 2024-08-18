<template>
  <div class="flex flex-col items-center text-lg mb-5">

    <MainClock />

    <div class="w-[650px]" relative mx-auto mt-15 h-12>

      <!-- Keyword recommend -->
      <div absolute w-full mt-12 bg-c_bg_navigation py-1 v-show="showKeyDownSel && noticeKeyList.length > 1"
        v-on-click-outside="handleKeyRecomend" @mouseleave="handleLeave()">
        <div hover:bg-blue-600 v-for="(item, i) in noticeKeyList.slice(1)" :key="i + 1" class="cursor-pointer"
          :class="{ 'bg-blue-600': i + 1 === selectedIndex }" @mouseover="handleHover(i + 1)" @click="jumpSearch(i + 1)"
          @touchstart="setActive(i + 1)" @touchend="setInactive(i + 1)">
          <div ml-3 my-1>{{ item }}</div>
        </div>
      </div>

      <!-- Search engine logo -->
      <div top-0 left-4 w-6 h-6 mt-3 absolute v-on-click-outside="() => selectionVisible = false">
        <div hover="op-100" h-full w-full flex-center cursor-pointer op="60" transition-300 @click="toggleSelection">
          <img :src="_getFavicon(searchList[curSearchIndex])" h-32 w-32>
        </div>
      </div>
      <div absolute w-60 mt-10 bg-c_bg_navigation v-show="selectionVisible">
        <div flex cursor-pointer items-center justify-between px-12px py-7px hover:bg-blue-600
          v-for="(item, i) in searchList" :key="i" @click="changeSearch(i)">
          <div flex-center gap-x-8px>
            <img :src="_getFavicon(item)" circle h-25px w-25px>
            <div ml-4>{{ item.name }}</div>
            <div ml-4px>{{ `#${item.s}` }}</div>
          </div>
          <div v-if="curSearchIndex === i" i-mdi-check-bold />
        </div>
      </div>


      <!-- Input -->
      <div flex items-center w="full">
        <input h-12 w-full px-3 pl-12 py-2 rounded-3 shadow-sm focus:outline-none focus:ring placeholder-gray-400
          bg-c_bg_input border border-gray-300 focus:ring-blue-500 focus:border-blue-500 type="text"
          ref="searchInputRef" v-model="keyword" @keydown.enter="search" @input="handleInput" @focus="handleFocus"
          @keydown="handleKeydown" @keydown.down.exact="keyNext" @keydown.up.exact="keyPrev"
          @keydown.tab.exact="keyTable">

      </div>

      <!-- Button -->
      <button i-mdi-close top-2 right-13 absolute inline-block text-8 hover:bg-blue-500 focus:outline-none p-2
        rounded-full v-if="keyword.length > 0" @click="handleCloseClick" />
      <button i-mdi-search top-2 right-3 absolute inline-block text-8 hover:bg-blue-500 focus:outline-none p-2
        rounded-full @click="search" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainClock from './simple-clock.vue'
import { vOnClickOutside } from '@vueuse/components'
import { debounce } from '@/utils/common'
import searchEngine from '@/utils/search-engine'

type Search = {
  name: string
  key: string
  url: string
  wd: string
  favicon: string
  s: string
}

const searchList: Search[] = [
  {
    name: '百度', key: "Baidu", url: 'https://www.baidu.com/s', wd: 'wd', favicon: '/svg/baidu.svg', s: 'bd'
  },
  {
    name: 'Google', key: "Google", url: 'https://www.google.com/search', wd: 'q', favicon: '/svg/google.svg', s: 'gg'
  },
  {
    name: '必应', key: "Bing", url: 'https://www.bing.com/search', wd: 'q', favicon: '/svg/bing.svg', s: 'bi'
  }
]

const keyword = ref('')
const curSearchIndex = ref(0)
const searchInputRef = ref<HTMLInputElement>()

function search(e?: any) {
  if (
    !keyword.value.trim()
    // 防止中文输入时回车键触发搜索
    || e?.isComposing
  )
    return
  const currentSearch = searchList[curSearchIndex.value]
  window.open(`${currentSearch.url}?${currentSearch.wd}=${keyword.value}`)
  clearNoticeKey()
  searchInputRef.value?.blur()
}

function _getFavicon(search: Search) {
  return search.favicon
}

/* 搜索引擎选择 */
const selectionVisible = ref(false)
function changeSearch(i: number) {
  curSearchIndex.value = i
  selectionVisible.value = false
}
function toggleSelection() {
  selectionVisible.value = !selectionVisible.value;
}

function keyTable(e: Event) {
  e.preventDefault()
  curSearchIndex.value = 1 + curSearchIndex.value
  if (curSearchIndex.value >= searchList.length) {
    curSearchIndex.value = 0
  }
}

/* 处理按键 */
function handleKeydown(e: KeyboardEvent) {
  // - 快捷切换搜索引擎
  if (e.key === '#' && !keyword.value.length)
    selectionVisible.value = true
  const target = (keyword.value + e.key).match(/^#[a-z]+/)
  if (target) {
    const s = target[0].replace('#', '')
    const index = searchList.findIndex(item => item.s === s)
    if (index === -1)
      return
    e.preventDefault()
    changeSearch(index)
    keyword.value = ''
    selectionVisible.value = false
  }
  // 关闭搜索引擎选择
  if (keyword.value === '#' && e.key === 'Backspace')
    selectionVisible.value = false
}

/* 关键字推荐 */
const showKeyDownSel = ref(false)
const noticeKeyList = ref<string[]>([])
const selectedIndex = ref(0)

const handleComplete = (params: Params) => {
  showKeyDownSel.value = true
  if (keyword.value.trim().length === 0)
    return

  noticeKeyList.value.splice(0, noticeKeyList.value.length || 0)
  noticeKeyList.value.push(keyword.value, ...params.list)
}

const requestEngApi = debounce(() => {
  const curSearch = searchList[curSearchIndex.value]
  searchEngine.complete(curSearch.key as any, keyword.value, handleComplete)
}, 100)

function handleCloseClick() {
  keyword.value = ''
  searchInputRef.value?.focus()
}

function handleInput(_: Event) {
  if (keyword.value.indexOf('#') === 0)
    return
  if (!keyword.value.trim()) {
    clearNoticeKey()
    return
  }
  selectedIndex.value = 0
  requestEngApi()
}

interface Params {
  eng: string
  list: string[]
  wd: string
}

function jumpSearch(i: number) {
  keyword.value = noticeKeyList.value[i]
  search()
}

function clearNoticeKey() {
  showKeyDownSel.value = false
  noticeKeyList.value.splice(0, noticeKeyList.value.length || 0)
  selectedIndex.value = 0
  noticeKeyList.value.push(keyword.value)
}

function keyNext(e: Event) {
  e.preventDefault()
  selectedIndex.value = (selectedIndex.value + 1) % noticeKeyList.value.length || 0
  keyword.value = noticeKeyList.value[selectedIndex.value]
}

function keyPrev(e: Event) {
  e.preventDefault()
  selectedIndex.value = (selectedIndex.value - 1 + noticeKeyList.value.length) % noticeKeyList.value.length || 0
  keyword.value = noticeKeyList.value[selectedIndex.value]
}

function handleKeyRecomend(e: Event) {
  const clickedInput = e.target === searchInputRef.value
  if (clickedInput)
    return

  clearNoticeKey()
}

function handleHover(i: number) {
  selectedIndex.value = i
}

function handleLeave() {
  selectedIndex.value = 0
}

function handleFocus() {
  handleInput(new Event('input'))
}

function handleFocusShortcut(e: KeyboardEvent) {
  if (!(e.ctrlKey && e.key === 'Enter'))
    return
  searchInputRef.value?.focus()
  handleFocus()
}

function setActive(i: number) {
  selectedIndex.value = i
}

function setInactive(_: number) {
  selectedIndex.value = 0
}

onMounted(() => {
  window.addEventListener('keydown', handleFocusShortcut)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleFocusShortcut)
})

</script>