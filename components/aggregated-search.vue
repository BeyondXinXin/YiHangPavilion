<template>
  <div class="flex flex-col items-center text-lg">

    <MainClock />

    <div class="relative w-[600px] mx-auto mt-15 ">
      <div class="i-mdi-search top-0 left-3 w-6 h-6 mt-3 absolute"></div>
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

<script setup>
import { ref } from 'vue';
import MainClock from './simple-clock.vue';

const searchQuery = ref('');
const providers = {
  百度: 'https://www.baidu.com/s?wd=',
  知乎: 'https://www.zhihu.com/search?q=',
  Google: 'https://www.google.com/search?q=',
  Github: 'https://github.com/search?q=',
};
const currentProvider = ref('百度');
const readOnly = ref(false); // 添加 readOnly 属性并初始化为 false

const currentProviderPlaceholder = ref('百度一下，你就知道');

function search() {
  if (searchQuery.value.trim() === '') return;
  openSearch(currentProvider.value);
}

function setProvider(provider) {
  currentProvider.value = provider;
  if (searchQuery.value) {
    search();
  }
}

function openSearch(provider) {
  const searchUrl = providers[provider] + encodeURIComponent(searchQuery.value);
  window.open(searchUrl, '_blank');
}
</script>