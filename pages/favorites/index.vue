<template>
  <div class="w-[1200px]">

    <div class="fixed top-30 left-50 flex flex-col w-auto h-auto overflow-auto m-0 p-0 z-5">
      <div
        class="pl-2 hover:cursor-pointer border-l-3 border-transparent hover:border-l-3 hover:border-orange hover:color-orange"
        v-for="(tool, index) in tools" :key="index" :id="index" :class="{ nav_active: index == curIndex }">
        <a @click="scrollToElement(tool.id)">{{ tool.name }}</a>
      </div>
    </div>

    <div class="flex flex-col gap-12 relative pl-40">
      <section v-for="(tool, index) in tools" :key="tool" :id="tool.id">
        <header class="py-2 mb-4 text-2xl font-bold">{{ tool.name }}</header>
        <div class="flex flex-wrap gap-4">
          <a target="_blank" v-for="link in tool.collection" :key="link.link" rel="nofollow external" :href="link.link"
            class="
            w-[240px] h-[67px] flex items-center justify-between px-4 rounded-md border 
            hover:scale-[1.05] hover:z-2 transition-transform duration-300">
            <img :src="link.icon" alt="" class="w-8 h-8 " decoding="async" loading="lazy" />
            <span class="text-white">{{ link.name }}</span>
          </a>
        </div>

      </section>
    </div>
  </div>
</template>

<script setup>
import tools from './tools.ts';
function scrollToElement(id) {
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
}
</script>


