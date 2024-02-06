<template>
    <div class="w-[1200px]">

        <div class="flex flex-col gap-12 relative pl-40 pt-10">
            <section v-for="(tool, index) in tools" :key="tool" :id="tool.id">

                <div class="flex flex-wrap gap-6">
                    <a target="_blank" v-for="link in tool.collection" :key="link.link" rel="nofollow external"
                        :href="link.link" class="
              w-[300px] h-[67px] flex items-center justify-between px-4 rounded-md border 
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
import tools from './external-tools-data';

</script>
  
  
  