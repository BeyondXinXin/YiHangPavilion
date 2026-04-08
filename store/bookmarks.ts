import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Category, Domain, Site } from '@/utils/types'
import presetBookmarksData from '@/utils/preset.json'

const BOOKMARK_STORAGE_KEY = 'bookmarks'

function getDefaultDomains(): Domain[] {
  return JSON.parse(JSON.stringify(presetBookmarksData.domains)) as Domain[]
}

type BookmarkState = {
  customData: Domain[]
  domainIndex: number
  categoryIndex: number
  siteIndex: number
}

function loadBookmarkState(): BookmarkState {
  const fallbackState: BookmarkState = {
    customData: getDefaultDomains(),
    domainIndex: 0,
    categoryIndex: 0,
    siteIndex: 0,
  }

  if (!import.meta.client) {
    return fallbackState
  }

  try {
    const storedValue = localStorage.getItem(BOOKMARK_STORAGE_KEY)
    if (!storedValue) {
      return fallbackState
    }

    const parsed = JSON.parse(storedValue) as Partial<BookmarkState>
    return {
      customData: Array.isArray(parsed.customData) && parsed.customData.length > 0
        ? parsed.customData
        : fallbackState.customData,
      domainIndex: typeof parsed.domainIndex === 'number' ? parsed.domainIndex : 0,
      categoryIndex: typeof parsed.categoryIndex === 'number' ? parsed.categoryIndex : 0,
      siteIndex: typeof parsed.siteIndex === 'number' ? parsed.siteIndex : 0,
    }
  } catch {
    return fallbackState
  }
}

function persistBookmarkState(state: BookmarkState) {
  if (!import.meta.client) {
    return
  }

  localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(state))
}

export const useBookmarkStore = defineStore('bookmarks', () => {
  const initialState = loadBookmarkState()

  const customData = ref<Domain[]>(initialState.customData)
  const domainIndex = ref(initialState.domainIndex)
  const categoryIndex = ref(initialState.categoryIndex)
  const siteIndex = ref(initialState.siteIndex)

  const data = computed((): Domain[] => {
    if (customData.value.length === 0) {
      customData.value = getDefaultDomains()
    }
    return customData.value
  })

  watch([customData, domainIndex, categoryIndex, siteIndex], () => {
    persistBookmarkState({
      customData: customData.value,
      domainIndex: domainIndex.value,
      categoryIndex: categoryIndex.value,
      siteIndex: siteIndex.value,
    })
  }, { deep: true, flush: 'post' })

  function addSite(site: Site) {
    customData.value[domainIndex.value].categoryList[categoryIndex.value].siteList.push(site)
  }

  function addCategory(group: Category) {
    customData.value[domainIndex.value].categoryList.push(group)
  }

  function addDomain(cate: Domain) {
    customData.value.push(cate)
  }

  function updateSite(site: Partial<Site>) {
    Object.assign(customData.value[domainIndex.value].categoryList[categoryIndex.value].siteList[siteIndex.value], site)
  }

  function updateCategory(group: Partial<Category>) {
    Object.assign(customData.value[domainIndex.value].categoryList[categoryIndex.value], group)
  }

  function updateDomain(cate: Partial<Domain>) {
    Object.assign(customData.value[domainIndex.value], cate)
    categoryIndex.value = -1
    siteIndex.value = -1
  }

  function deleteSite() {
    customData.value[domainIndex.value].categoryList[categoryIndex.value].siteList.splice(siteIndex.value, 1)
  }

  function deleteCategory() {
    customData.value[domainIndex.value].categoryList.splice(categoryIndex.value, 1)
  }

  function deleteDomain() {
    customData.value.splice(domainIndex.value, 1)
  }

  function restoreData() {
    customData.value = getDefaultDomains()
  }

  function setDomainIndex(index: number) {
    domainIndex.value = index
    categoryIndex.value = -1
    siteIndex.value = -1
  }

  return {
    data,
    customData,
    domainIndex,
    categoryIndex,
    siteIndex,
    restoreData,
    addSite,
    addCategory,
    addDomain,
    updateSite,
    updateCategory,
    updateDomain,
    deleteSite,
    deleteCategory,
    deleteDomain,
    setDomainIndex,
  }
})
