<template>
    <a target="_blank" rel="nofollow external" :href="link.link" class="  
        w-[200px] h-[67px] flex items-center justify-between px-4 rounded-md border  
        hover:scale-[1.05] hover:z-2 transition-transform duration-300  
      ">
        <img :src="iconUrl" alt="" class="w-8 h-8" decoding="async" loading="lazy" />
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