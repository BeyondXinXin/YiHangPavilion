import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
import type { Domain } from '@/utils/types'

import presetBookmarksData from '@/utils/preset.json';

function loadData(): Domain[] | undefined {
  if (window) {
    const data = localStorage.getItem('cache')
    return data ? JSON.parse(data) : presetBookmarksData.domains
  }
  return undefined
}

export const useBookmarkStore = defineStore(
  'bookmarks',
  () => {

    // data
    const data = computed((): Domain[] => {
      if (window) {
        if (customData.value.length === 0) {
          customData.value = presetBookmarksData.domains
        }
        return presetBookmarksData.domains
      }
      return []
    })
    const customData = ref<Domain[]>(loadData() || [])

    return { data, customData };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  },
);
