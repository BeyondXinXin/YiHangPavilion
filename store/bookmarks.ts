import { defineStore } from 'pinia';
import { parse, stringify } from 'zipson';

import presetBookmarksData from '@/utils/preset.json';

export const useBookmarkStore = defineStore(
  'bookmarks',
  () => {
    const count = ref(10);
    const bookmarks = ref<{ id: string; collection: { icon: string; name: string; link: string }[] }[]>([]);
    const loaded = ref<boolean>(false);

    const getGeneral = computed(() => bookmarks.value.find((bookmark) => bookmark.id === 'general')?.collection);

    function increment() {
      count.value++;
    }

    // 从JSON加载书签数据（可选）
    function initializeBookmarks() {
      console.log("useBookmarkStore initializeBookmarks ...")
      if (!loaded.value) {
        console.log("useBookmarkStore loadBookmarks ...")
        loadBookmarks();
      }
    }

    function loadBookmarks() {
      bookmarks.value = presetBookmarksData.bookmarks;
      loaded.value = true;
    }

    // 添加书签到指定的分类（可选）
    function addBookmark(categoryId: string, bookmark: { icon: string; name: string; link: string }) {
      const category = bookmarks.value.find((cat) => cat.id === categoryId);
      if (category) {
        category.collection.push(bookmark);
      }
    }

    // 移除指定分类下的书签（可选）
    function removeBookmark(categoryId: string, bookmarkIndex: number) {
      const category = bookmarks.value.find((cat) => cat.id === categoryId);
      if (category) {
        category.collection.splice(bookmarkIndex, 1);
      }
    }

    return { count, bookmarks, loaded, getGeneral, initializeBookmarks, loadBookmarks, increment };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  },
);
