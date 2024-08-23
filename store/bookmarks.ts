import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Domain } from '@/utils/types'
import presetBookmarksData from '@/utils/preset.json'

// Helper function to load data
function loadData(): Domain[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('cache')
    return data ? JSON.parse(data) : presetBookmarksData.domains
  }
  return presetBookmarksData.domains
}

export const useBookmarkStore = defineStore('bookmarks', () => {
  const customData = ref<Domain[]>(loadData())
  
  const domainIndex = ref(0)
  const categoryIndex = ref(0)
  const siteIndex = ref(0)

  const data = computed((): Domain[] => {
    if (typeof window !== 'undefined') {
      if (customData.value.length === 0) {
        customData.value = presetBookmarksData.domains
      }
      return customData.value
    }
    return []
  })

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
    customData.value = presetBookmarksData.domains
  }

  return {
    data, customData, domainIndex, categoryIndex, siteIndex, restoreData,
    addSite, addCategory, addDomain,
    updateSite, updateCategory, updateDomain,
    deleteSite, deleteCategory, deleteDomain,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
});
