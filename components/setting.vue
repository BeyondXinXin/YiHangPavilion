<template>
    <client-only>



    </client-only>
</template>

<script setup lang="ts">
import { useSessionStore, useSettingStore } from '~/store/setting'

const settingStore = useSettingStore()
const sessionStore = useSessionStore()

</script>
