<template>
  <div class="w-[1200px] pt-10">

    <div class="flex flex-col gap-10px">

      <div v-for="(tool, index) in bookmarkStore.bookmarks" :key="tool" :id="tool.id" class="flex flex-row">
        <header class="flex w-[100px] justify-center font-bold">{{ tool.name }}</header>
        <div class="grid grid-cols-6 gap-10px">
          <SimpleSiteItemCard v-for="link in tool.collection" :key="link.link" :link="link" class="" />
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import SimpleSiteItemCard from '~/components/simple-site-item-card.vue';
import { useBookmarkStore } from '~/store/bookmarks';

const bookmarkStore = useBookmarkStore();
bookmarkStore.initializeBookmarks();


</script>


<!-- <div class="fixed top-30 left-50 flex flex-col w-auto h-auto overflow-auto m-0 p-0 z-5">
<div
class="pl-2 hover:cursor-pointer border-l-3 border-transparent hover:border-l-3 hover:border-orange hover:color-orange"
v-for="(tool, index) in bookmarkStore.bookmarks" :key="index" :id="index">
<a @click="scrollToElement(tool.id)">{{ tool.name }}</a>
</div>
</div> -->

<!-- function scrollToElement(id) {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    var rect = targetElement.getBoundingClientRect();
    var scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    var absoluteTopPosition = rect.top + scrollTop - 80;
    window.scrollTo({
      top: absoluteTopPosition,
      behavior: 'smooth', // 平滑滚动效果
    });
  }
} -->