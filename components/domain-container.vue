<template>
    <client-only>
        <NConfigProvider :theme="theme">

            <DomainNav />
            <DomainCategorylist />
            <DomainModal />

        </NConfigProvider>
    </client-only>
</template>

<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui'
import DomainNav from '~/components/domain-nav.vue'
import DomainCategorylist from '~/components/domain-categorylist.vue'
import DomainModal from '~/components/domain-modal.vue'

const theme = ref(darkTheme)

</script>
