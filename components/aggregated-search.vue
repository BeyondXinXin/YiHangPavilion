<template>
  <div class="flex flex-col items-center text-lg ">

    <MainClock/>

    <div class="relative w-[600px] mx-auto mt-15 ">
      <svg class=" top-0 left-3 w-6 h-6 mt-3 absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      <input v-model="searchQuery" @keyup.enter="search" :placeholder="currentProviderPlaceholder"
        placeholder="placeholder" class="h-12 w-full px-3 py-2 pl-12 rounded-3 shadow-sm focus:outline-none focus:ring
       placeholder-gray-400  bg-c_bg_input border border-gray-300 
         focus:ring-blue-500 focus:border-blue-500" type="text" />
    </div>

    <div class="flex-1 mb-4 max-w-120 mt-5 ">

      <ul class="flex gap-1em w-full">
        <li v-for="(url, provider) in providers" :key="provider" @click="setProvider(provider)" :class="[
          'w-1/2 cursor-pointer',
          currentProvider === provider && !readOnly ? 'text-c_highlight' : 'hover:text-c_lowlight',
        ]">
          {{ provider }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import MainClock from './simple-clock.vue'

export default {
  components: {
    MainClock
  },
  data() {
    return {
      searchQuery: '',
      providers: {
        百度: 'https://www.baidu.com/s?wd=',
        知乎: 'https://www.zhihu.com/search?q=',
        Google: 'https://www.google.com/search?q=',
        Github: 'https://github.com/search?q=',
      },
      currentProvider: '百度',
    };
  },
  computed: {
    currentProviderPlaceholder() {
      const placeholders = {
        百度: '百度一下，你就知道',
        知乎: 'Search 知乎...',
        Google: 'Search Google',
        Github: 'Search Github',
      };
      return placeholders[this.currentProvider] || 'Search the web...';
    },
  },
  methods: {
    search() {
      if (this.searchQuery.trim() === '') return;
      this.openSearch(this.currentProvider);
    },
    setProvider(provider) {
      this.currentProvider = provider;
      // if (this.searchQuery) this.search();
    },
    openSearch(provider) {
      const searchUrl = this.providers[provider] + encodeURIComponent(this.searchQuery);
      window.open(searchUrl, '_blank');
    },
  },
};
</script>
