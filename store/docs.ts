import { defineStore } from 'pinia';
import { parse, stringify } from 'zipson';

import presetData from '@/utils/preset.json';

interface Document {
  link: string;
  name: string;
}

interface Subclass {
  id: string;
  name: string;
  document: Document[];
  article: Document[];
}

interface Category {
  id: string;
  name: string;
  subclass: Subclass[];
}

export const useDocsStore = defineStore(
  'docs',
  () => {
    const curIndex = ref(0);
    const data = ref<Category[]>([]);
    const loaded = ref<boolean>(false);

    function initializeDocs() {
      if (!loaded.value) {
        loadDocs();
      }
    }

    function loadDocs() {
      data.value = presetData.docs;
      loaded.value = true;
    }

    function setCurrentIndex(newIndex: number) {
      curIndex.value = newIndex;
    }

    return { data, loaded, curIndex, initializeDocs, loadDocs, setCurrentIndex };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  },
);
