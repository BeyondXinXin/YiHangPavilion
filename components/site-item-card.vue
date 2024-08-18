<template>
    <a target="_blank" rel="nofollow external" :href="link.link" class="  
        w-[140px] h-[55px] flex items-center pl-4 pr-2 rounded-md border border-[#80808080] hover:border-[#ffffff]
        hover:scale-[1.05] hover:z-2 transition-transform duration-300  
      ">
        <img :src="iconUrl" alt="" class="w-32px h-32px mr-2" decoding="async" loading="lazy" />
        <span class="text-white text-[14px] truncate whitespace-nowrap">{{ link.name }}</span>
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