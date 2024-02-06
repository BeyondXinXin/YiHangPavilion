<template>
  <div class="p1">
    <DocTitle :article="props.article" />
    <ContentRenderer :value="props.article" />
    <DocFooter />
  </div>
</template>


<script setup lang="ts">
const props = defineProps(['article'])
import DocTitle from './doc-title.vue';
</script>

