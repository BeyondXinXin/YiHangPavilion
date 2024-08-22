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

  const data = computed((): Domain[] => {
    if (typeof window !== 'undefined') {
      if (customData.value.length === 0) {
        customData.value = presetBookmarksData.domains
      }
      return customData.value
    }
    return []
  })

  function restoreData() {
    customData.value = presetBookmarksData.domains
  }

  return { data, customData, restoreData }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
});
