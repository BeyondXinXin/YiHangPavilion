<template>
    <div class="w-[1080px] flex flex-col justify-center items-center m-20px">
        <ul class="flex gap-1em w-full max-w-[800px] justify-center">
            <li v-for="(site, index) in docsStore.data" :key="index" @click="handleCateClick(index)"
                class="max-w-[80px] w-1/2 cursor-pointer text-center">
                {{ site.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>

import { useDocsStore } from '~/store/docs';

const readOnly = ref(false); // 添加 readOnly 属性并初始化为 false
const docsStore = useDocsStore();
docsStore.initializeDocs();

function handleCateClick(index) {
    docsStore.setCurrentIndex(index);
}

</script>
  