<template>
    <client-only>
        <div class="w-[1080px] flex flex-col justify-center items-center m-20px">
            <ul class="flex gap-1em w-full max-w-[800px] justify-center">
                <li v-for="(site, index) in docsData" :key="index" @click="handleCateClick(index)" :class="['max-w-[80px]', 'w-1/2', 'cursor-pointer', 'text-center',
                    { 'text-c_highlight': currentIndex === index }]">
                    {{ site.name }}
                </li>
            </ul>
        </div>
    </client-only>
</template>  
    
<script setup>
import { ref, computed } from 'vue';
import { useDocsStore } from '~/store/docs';

const docsStore = useDocsStore();
docsStore.initializeDocs();

const currentIndex = ref(docsStore.curIndex);

const docsData = computed(() => {
    const data = docsStore.data;
    return data || [];
});

function handleCateClick(index) {
    docsStore.setCurrentIndex(index);
    currentIndex.value = index;
}

</script> 
