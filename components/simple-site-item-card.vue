<template>
    <a target="_blank" rel="nofollow external" :href="link.link" class="  
        w-[160px] h-[36px] flex items-center px-4 rounded-md gap-10px text-3.5
        hover:scale-[1.05] hover:z-2 hover:border transition-transform duration-300 
      ">
        <img :src="iconUrl" alt="" class="w-24px h-24px" decoding="async" loading="lazy" />
        <span class="text-white">{{ link.name }}</span>
    </a>
</template>  
    
<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import { getFaviconUrl } from '~/utils/favicon.ts';

const props = defineProps({
    link: {
        type: Object,
        required: true
    }
});

const iconUrl = computed(() => {
    if (props.link.icon) {
        return props.link.icon;
    } else {
        const domain = getDomainName(props.link.link);
        return domain ? getFaviconUrl(domain) : '';
    }
});

</script>