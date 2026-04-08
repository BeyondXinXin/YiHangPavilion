<template>
  <NConfigProvider :theme="darkTheme">
    <DomainNav />
    <DomainCategorylist />
    <DomainModal />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui'
import DomainNav from '~/components/domain-nav.vue'
import DomainCategorylist from '~/components/domain-categorylist.vue'
import DomainModal from '~/components/domain-modal.vue'
</script>
