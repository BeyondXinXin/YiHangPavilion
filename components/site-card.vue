<template>
    <a target="_blank" rel="nofollow external" :href="site.url" class="select-none
        w-[140px] h-[55px] flex items-center pl-2 pr-2 rounded-md border border-[#80808080] hover:border-[#ffffff]
        hover:scale-[1.05] hover:z-2 transition-transform duration-300  
      ">
        <img :src="iconUrl" alt="" class="w-32px h-32px mr-2" decoding="async" loading="lazy" />
        <span class="text-white text-14px">{{ site.name }}</span>
    </a>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import { getFaviconUrl } from '~/utils/favicon.ts';

const props = defineProps({
    site: {
        type: Object,
        required: true
    }
});

const iconUrl = computed(() => {
    if (props.site.favicon) {
        return props.site.favicon;
    } else {
        const domain = getDomainName(props.site.url);
        return domain ? getFaviconUrl(domain) : '';
    }
});

</script>
