<template>
  <div class="flex bg-c_bg_navigation rounded-lg items-center min-w-[700px] mx-auto fixed z-10 top-12"
    style="left: 50%; transform: translate(-50%, -50%);">

    <div class="text-2xl pl-8 font-bold">易航阁</div>
    <div class="text-xl flex-1 flex justify-center gap-4">
      <a v-for="link in navLinks" :key="link.path" :href=link.path :to=link.path :title="link.title"
        v-bind="link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
        class="transition-colors duration-300 p-4 border-b-2" :class="{
          'font-bold border-orange': !link.external && $route.path === link.path,
          'border-transparent': link.external || $route.path !== link.path,
        }">
        <span class="hidden md:inline">{{ link.title }}</span>
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
import { navLinks } from '@/site.config';
</script>


