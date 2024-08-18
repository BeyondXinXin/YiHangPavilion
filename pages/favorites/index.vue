<template>
  <!-- <div class="w-[1200px] pt-10">
    <button i-mdi-search top-2 right-3 inline-block text-8 hover:bg-blue-500 focus:outline-none p-2 rounded-full
      @click="funText1" />
    <button i-mdi-close top-2 right-3 inline-block text-8 hover:bg-blue-500 focus:outline-none p-2 rounded-full
      @click="funText2" />
  </div> -->

  <client-only>
    <div class="w-[1200px] pt-10" v-if="settingStore.isClient">

      <div class="flex flex-col gap-10px">

        <div v-for="(tool, index) in selectedData" :key="tool" :id="tool.id" class="flex flex-row">
          <header class="flex w-[100px] justify-center font-bold">{{ tool.name }}</header>
          <div class="grid grid-cols-6 gap-10px">
            <SimpleSiteItemCard v-for="link in tool.collection" :key="link.link" :link="link" class="" />
          </div>
        </div>

      </div>

    </div>
  </client-only>


</template>

<script setup>
import SimpleSiteItemCard from '~/components/simple-site-item-card.vue'
import { useBookmarkStore } from '~/store/bookmarks'
import { useSettingStore } from '~/store/setting'

const bookmarkStore = useBookmarkStore()
const settingStore = useSettingStore()

const selectedData = computed(() => {
  return settingStore.websitePreference === 'default' ? bookmarkStore.data : bookmarkStore.customData;
});

function funText1() {
  settingStore.reset()
}

function funText2() {
  settingStore.custom()
}

</script>
