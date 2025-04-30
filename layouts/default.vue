<template>
  <div w-full p-5 flex flex-col min-h-screen>


    <main flex-1 mx-auto >
      <slot />
    </main>

    <Footer />

  </div>
</template>

<script lang="ts" setup>
import Footer from './components/footer.vue';
import { useSettingStore, useSessionStore } from '~/store/setting'

const sessionStore = useSessionStore()
const settingStore = useSettingStore()

</script>

<style scoped></style>
