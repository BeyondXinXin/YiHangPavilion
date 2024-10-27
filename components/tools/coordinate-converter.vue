<template>
  <!-- <NConfigProvider :theme="darkTheme">
    <div class="flex flex-col gap-12 lg:flex-row max-w-screen-xl mx-auto">
      <In class="flex-1" @numberChange="handleNumberChange" />
      <Out class="flex-1" ref="outRef" />
    </div>
  </NConfigProvider> -->
</template>




<script setup lang="ts">
import { ref } from 'vue';
import { darkTheme, NConfigProvider } from 'naive-ui';

import In from './coordinate-converter/in.vue';
import Out from './coordinate-converter/out.vue';

const outRef = ref(null);

function handleNumberChange(newNumber) {
  if (outRef.value) {
    outRef.value.handleInput(newNumber);
  }
}

defineExpose({
  outRef,
});

</script>
