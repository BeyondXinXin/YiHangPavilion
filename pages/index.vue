<template>
  <div class="w-[1200px]">
    <MainClock v-if="!sessionStore.isSetting" />
    <AggregatedSearch v-if="!sessionStore.isSetting" />
    <DomainContainer />
    <Setting v-if="sessionStore.isSetting" />
  </div>
</template>

<script setup>
import AggregatedSearch from '~/components/search.vue';
import MainClock from '~/components/clock.vue'
import DomainContainer from '~/components/domain-container';
import Setting from '~/components/setting';
import { useSettingStore, useSessionStore } from '~/store/setting'

const sessionStore = useSessionStore()
const settingStore = useSettingStore()

</script>
