<template>
    <NModal v-model:show="modalStore.modalVisible" preset="dialog" title="Dialog" :show-icon="false" :closable="false">
        <template #header>
            <div>{{ modalStore.title }}</div>
        </template>

        <div flex flex-col gap-y-4 mt-2>
            <n-input v-model:value="modalStore.inputValues.name"
                :status="modalStore.inputValues.name ? undefined : inputStatus" :placeholder="'名称'"
                @keydown.enter="handleCommit" />
            <n-input v-if="modalStore.target === 'site'" v-model:value="modalStore.inputValues.url"
                :status="modalStore.inputValues.url.trim() ? undefined : inputStatus" :placeholder="'链接'"
                @keydown.enter="handleCommit" />

        </div>

        <template #action>
            <div flex gap-x-4 mt-6>
                <n-button @click="modalStore.handleCancel">
                    取消
                </n-button>
                <n-button v-if="modalStore.action === 'update'" type="error" @click="modalStore.handleDelete">
                    删除
                </n-button>
                <n-button type="primary" @click="handleCommit">
                    确认
                </n-button>
            </div>
        </template>

    </NModal>





</template>

<script setup lang="ts">
import { NModal, NButton, NInput } from 'naive-ui'
import { useModalStore } from '~/store/modal'

const modalStore = useModalStore()
const inputStatus = ref<'error' | 'success'>('success')

function handleCommit() {
    console.log(modalStore.inputValues.name)
    if (!modalStore.inputValues.name) {
        return
    }
    modalStore.handleCommit()
}
</script>