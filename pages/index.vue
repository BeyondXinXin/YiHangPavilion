<template>
  <div class="w-[1200px]">
    <MainClock v-if="!sessionStore.isSetting" />
    <AggregatedSearch v-if="!sessionStore.isSetting" />
    <DomainContainer />
    <Setting v-if="sessionStore.isSetting" />
  </div>
</template>

<script setup lang="ts">
import MainClock from '~/components/clock.vue'
import DomainContainer from '~/components/domain-container.vue'
import AggregatedSearch from '~/components/search.vue'
import Setting from '~/components/setting.vue'
import { useSessionStore } from '~/store/setting'

const sessionStore = useSessionStore()
</script>
