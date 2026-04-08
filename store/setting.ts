import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const SETTING_STORAGE_KEY = 'setting'

type WebsitePreference = 'default' | 'custom'

type SettingState = {
  isSynchronization: boolean
  websitePreference: WebsitePreference
  passphrase: string
}

const defaultSettingState: SettingState = {
  isSynchronization: false,
  websitePreference: 'default',
  passphrase: '',
}

function loadSettingState(): SettingState {
  if (!import.meta.client) {
    return { ...defaultSettingState }
  }

  try {
    const storedValue = localStorage.getItem(SETTING_STORAGE_KEY)
    if (!storedValue) {
      return { ...defaultSettingState }
    }

    return {
      ...defaultSettingState,
      ...JSON.parse(storedValue),
    }
  } catch {
    return { ...defaultSettingState }
  }
}

function persistSettingState(state: SettingState) {
  if (!import.meta.client) {
    return
  }

  localStorage.setItem(SETTING_STORAGE_KEY, JSON.stringify(state))
}

export const useSettingStore = defineStore('setting', () => {
  const initialState = loadSettingState()

  const isSynchronization = ref(initialState.isSynchronization)
  const websitePreference = ref<WebsitePreference>(initialState.websitePreference)
  const passphrase = ref(initialState.passphrase)

  watch([isSynchronization, websitePreference, passphrase], () => {
    persistSettingState({
      isSynchronization: isSynchronization.value,
      websitePreference: websitePreference.value,
      passphrase: passphrase.value,
    })
  }, { flush: 'post' })

  function custom() {
    websitePreference.value = 'custom'
  }

  function reset() {
    websitePreference.value = 'default'
  }

  return { passphrase, isSynchronization, websitePreference, custom, reset }
})

export const useSessionStore = defineStore('session', () => {
  const isSetting = ref(false)
  return { isSetting }
})
