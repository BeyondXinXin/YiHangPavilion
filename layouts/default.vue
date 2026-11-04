<template>
  <div class="flex min-h-screen w-full flex-col p-5">
    <main class="mx-auto flex w-full flex-1 flex-col">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Footer from './components/footer.vue'
</script>
