<template>
  <div class="w-full p-5 flex flex-col min-h-screen">

    <NavBar class="jq-font" />
    <div class="fixed top-0 left-0 right-0 z-9 w-full h-[90px] bg-c_bg" ></div>
    
    <main class="mt-18 zhht-font flex-1 mx-auto ">
      <slot />
    </main>

    <Footer />

  </div>
</template>

<script lang="ts" setup>
import NavBar from './components/nav-bar.vue';
import Footer from './components/footer.vue';
</script>

<style scoped>
.zhht-font {
  font-family: "zhht font";
}

.jq-font {
  font-family: "jq-font";
}
</style>

