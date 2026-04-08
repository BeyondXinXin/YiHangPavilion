<template>
  <NConfigProvider :theme="darkTheme">
    <div my10 mb0 text-18px />

    <div flex flex-row mt8>
      <div flex flex-row w-200 bg-c_bg_navigation p-4>
        <div flex flex-row gap-x-5 w-80>
          <NIcon size="20">
            <div i-simple-icons:icloud />
          </NIcon>
          <div text-18px>{{ settingStore.isSynchronization ? '云端同步已开启' : '匿名同步至云端' }}</div>
        </div>

        <div flex w-140>
          <NInput
            v-if="!settingStore.isSynchronization"
            mr-6
            v-model:value="passphrase"
            :disabled="settingStore.isSynchronization"
            type="text"
            placeholder="输入口令"
          />
        </div>

        <n-button v-if="!settingStore.isSynchronization" mr-6 @click="pushBtnClick">上传数据</n-button>
        <n-button v-if="settingStore.isSynchronization" mr-6 @click="cancelSyncBtnClick">取消同步</n-button>
        <n-button mr-6 @click="retrieveBtnClick">下载数据</n-button>
      </div>

      <div flex flex-row w-120 p-4 ml-10>
        <n-button mr-6 type="tertiary" @click="restoreBtnClick">恢复初始设置</n-button>
        <n-button mr-6 @click="saveBtnClick">保存</n-button>
      </div>
    </div>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { darkTheme, NButton, NConfigProvider, NIcon, NInput } from 'naive-ui'
import { useBookmarkStore } from '~/store/bookmarks'
import { useSessionStore, useSettingStore } from '~/store/setting'
import { pushDataToServer, retrieveDataFromServer } from '@/utils/api'

const bookmarkStore = useBookmarkStore()
const settingStore = useSettingStore()
const sessionStore = useSessionStore()
const passphrase = ref('')

function getPassphraseHash() {
  return CryptoJS.SHA256(passphrase.value).toString(CryptoJS.enc.Base64).substring(0, 12)
}

function pushBtnClick() {
  if (!settingStore.isSynchronization && passphrase.value === '') {
    return
  }

  settingStore.isSynchronization = true
  settingStore.passphrase = getPassphraseHash()
  void pushDataToServer()
}

function retrieveBtnClick() {
  if (settingStore.isSynchronization) {
    void retrieveDataFromServer()
    return
  }

  if (passphrase.value === '') {
    return
  }

  settingStore.isSynchronization = true
  settingStore.passphrase = getPassphraseHash()
  void retrieveDataFromServer()
}

function cancelSyncBtnClick() {
  settingStore.isSynchronization = false
  settingStore.passphrase = ''
}

function restoreBtnClick() {
  bookmarkStore.restoreData()
}

function saveBtnClick() {
  if (settingStore.isSynchronization) {
    void pushDataToServer()
  }

  sessionStore.isSetting = false
}
</script>
