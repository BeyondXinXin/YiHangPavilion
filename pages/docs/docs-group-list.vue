<template>
    <client-only class="border-b-1 border-transparent hover:border-b-1 hover:border-orange" v-for="subclass in subclassData"
        :key="subclass.id">

        <div class="flex flex-row gap-4">
            <div class="flex w-[120px] justify-center">【 {{ subclass.name }} 】</div>
            <div class="flex w-[100px] text-right color-gray">Document</div>
            <a v-for="link1 in subclass.document" :href="link1.link" :key="link1.link" target="_blank"
                rel="nofollow external" class="flex hover:color-blue"> {{ link1.name }} </a>
            <div class="flex-1"></div>
        </div>

        <div v-if="subclass.article && subclass.article.length" class="flex flex-row">
            <div class="w-[220px] text-right color-gray mr-8">Article</div>
            <div class="flex flex-col">
                <a v-for="(link1, index) in subclass.article" :href="link1.link" :key="index" target="_blank"
                    rel="nofollow external" class=" hover:color-blue">
                    {{ link1.name }} </a>
            </div>
        </div>


    </client-only>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useDocsStore } from '~/store/docs';

const docsStore = useDocsStore();
const subclassData = ref([]);

watchEffect(() => {
    const curIndex = docsStore.curIndex;
    const data = docsStore.data[curIndex];
    subclassData.value = data?.subclass || [];
});

</script>

