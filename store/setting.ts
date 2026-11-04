import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const SETTING_STORAGE_KEY = 'setting'

type SettingState = {
  isSynchronization: boolean
  passphrase: string
}

const defaultSettingState: SettingState = {
  isSynchronization: false,
  passphrase: '',
}

function loadSettingState(): SettingState {
  if (typeof window === 'undefined') {
    return { ...defaultSettingState }
  }

  try {
    const storedValue = localStorage.getItem(SETTING_STORAGE_KEY)
    if (!storedValue) {
      return { ...defaultSettingState }
    }

    const parsed = JSON.parse(storedValue) as Partial<SettingState>
    return {
      isSynchronization: parsed.isSynchronization === true,
      passphrase: typeof parsed.passphrase === 'string' ? parsed.passphrase : '',
    }
  } catch {
    return { ...defaultSettingState }
  }
}

export const useSettingStore = defineStore('setting', () => {
  const initialState = loadSettingState()

  const isSynchronization = ref(initialState.isSynchronization)
  const passphrase = ref(initialState.passphrase)

  watch([isSynchronization, passphrase], () => {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.setItem(SETTING_STORAGE_KEY, JSON.stringify({
      isSynchronization: isSynchronization.value,
      passphrase: passphrase.value,
    }))
  }, { flush: 'post' })

  return { isSynchronization, passphrase }
})

export const useSessionStore = defineStore('session', () => {
  const isBookmarksOpen = ref(false)
  return { isBookmarksOpen }
})
