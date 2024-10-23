<template>

    <client-only>
        <n-config-provider :theme="theme">
            <div my10 mb0 text-18px/> 

            <div grid grid-cols-2 md="grid-cols-3" lg="grid-cols-6" justify-between gap-12>
                <Selection v-model="isShowNavBar" :options="visibilityOptions" title="显示导航栏" />
                <Selection v-model="isShowTime" :options="visibilityOptions" title="显示时间" />
                <Selection v-model="isShowFooter" :options="visibilityOptions" title="显示页脚" />
            </div>

            <div flex flex-row mt8>

                <div flex flex-row w-200 bg-c_bg_navigation p-4>
                    <div flex flex-row gap-x-5 w-80>
                        <NIcon size="20">
                            <div i-simple-icons:icloud />
                        </NIcon>
                        <div text-18px>{{ settingStore.isSynchronization ? '云端同步已开启' : '匿名同步至云端' }}</div>
                    </div>
                    <div flex w-140>
                        <NInput v-if="!settingStore.isSynchronization" mr-6 v-model:value="passphrase"
                            :disabled="settingStore.isSynchronization as boolean" type="text" placeholder="输入口令" />
                    </div>
                    <n-button mr-6 v-if="!settingStore.isSynchronization" @click="pushBtnClick()">上传数据</n-button>
                    <n-button mr-6 v-if="settingStore.isSynchronization" @click="cancelSyncBtnClick()">取消同步</n-button>
                    <n-button mr-6 @click="retrieveBtnClick()">下载数据</n-button>
                </div>

                <div flex flex-row w-120 p-4 ml-10>
                    <n-button mr-6 @click="restoreBtnClick()" type="tertiary">恢复初始设置</n-button>
                    <n-button mr-6 @click="saveBtnClick()">保存</n-button>
                </div>

            </div>

        </n-config-provider>
    </client-only>



</template>

<script lang="ts" setup>

import { ref } from 'vue'
import Selection from '~/components/selection.vue'
import { darkTheme, NConfigProvider, NInput, NButton, NIcon } from 'naive-ui'
import { useSettingStore, useSessionStore } from '~/store/setting'
import CryptoJS from 'crypto-js';
import { useBookmarkStore } from '~/store/bookmarks'
import { pushDataToServer, retrieveDataFromServer } from '@/utils/api'

const bookmarkStore = useBookmarkStore()
const settingStore = useSettingStore()
const sessionStore = useSessionStore()

const theme = ref(darkTheme)
const passphrase = ref("")

// 定义可选项 "显示" 和 "隐藏"
const visibilityOptions = [
    { label: '显示', value: 1 },
    { label: '隐藏', value: 0 },
];

// 绑定到 Pinia Store 的状态
const isShowNavBar = computed({
    get: () => settingStore.isShowNavBar ? 1 : 0,
    set: (value) => settingStore.isShowNavBar = value === 1
})
const isShowTime = computed({
    get: () => settingStore.isShowTime ? 1 : 0,
    set: (value) => settingStore.isShowTime = value === 1
})
const isShowFooter = computed({
    get: () => settingStore.isShowFooter ? 1 : 0,
    set: (value) => settingStore.isShowFooter = value === 1
})

function pushBtnClick() {
    if (!settingStore.isSynchronization && passphrase.value === "") {
        return
    }
    settingStore.isSynchronization = true
    const fullHash = CryptoJS.SHA256(passphrase.value).toString(CryptoJS.enc.Base64)
    settingStore.passphrase = fullHash.substring(0, 12)
    onPushData()

}
function retrieveBtnClick() {
    console.log(settingStore.isSynchronization)
    if (settingStore.isSynchronization) {
        onRetrieveData()
    } else {
        if (passphrase.value !== "") {
            settingStore.isSynchronization = true
            const fullHash = CryptoJS.SHA256(passphrase.value).toString(CryptoJS.enc.Base64)
            settingStore.passphrase = fullHash.substring(0, 12)
            onRetrieveData()
        }
    }
}
function cancelSyncBtnClick() {
    settingStore.isSynchronization = false
    settingStore.passphrase = ""
}

function restoreBtnClick() {
    bookmarkStore.restoreData()
}

function saveBtnClick() {
    if (settingStore.isSynchronization) {
        onPushData()
    }
    sessionStore.isSetting = false
}

async function onPushData() {
    await pushDataToServer();
}

async function onRetrieveData() {
    await retrieveDataFromServer();
}

</script>


