import { defineStore } from 'pinia';
import { parse, stringify } from 'zipson';

import presetBookmarksData from '@/utils/preset.json';

type Collection = {
  icon: string; name: string; link: string;
}
type Bookmarks = {
  id: string; name: string; collection: Collection[];
}

function loadData(): Bookmarks[] | undefined {
  if (window) {
    const data = localStorage.getItem('cache')
    return data ? JSON.parse(data) : presetBookmarksData.bookmarks
  }
  return undefined
}

export const useBookmarkStore = defineStore(
  'bookmarks',
  () => {

    // data
    const data = computed((): Bookmarks[] => {
      if (window) {
        if (customData.value.length === 0) {
          customData.value = presetBookmarksData.bookmarks
        }
        return presetBookmarksData.bookmarks
      }
      return []
    })
    const customData = ref<Bookmarks[]>(loadData() || [])

    return { data, customData };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  },
);
