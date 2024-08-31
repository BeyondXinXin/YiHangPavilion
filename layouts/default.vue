<template>
  <div w-full p-5 flex flex-col min-h-screen>


    <NavBar v-if="!sessionStore.isSetting && settingStore.isShowNavBar" />

    <main flex-1 mx-auto>
      <div v-if="!sessionStore.isSetting && settingStore.isShowNavBar" mt-20></div>
      <slot />
    </main>

    <Footer />

  </div>
</template>

<script lang="ts" setup>
import NavBar from './components/nav-bar.vue';
import Footer from './components/footer.vue';
import { useSettingStore, useSessionStore } from '~/store/setting'

const sessionStore = useSessionStore()
const settingStore = useSettingStore()

</script>

<style scoped></style>
