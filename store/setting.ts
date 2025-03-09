import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', () => {
    const isSynchronization = ref<Boolean>(false)
    const websitePreference = ref("default")
    const passphrase = ref("")

    function custom() {
        websitePreference.value = "custom"
    }
    function reset() {
        websitePreference.value = "default"
    }
    return { passphrase, isSynchronization, websitePreference, custom, reset }
}, {
    persist: {
        storage: persistedState.localStorage,
    },
}
)

export const useSessionStore = defineStore('session', () => {
    const isSetting = ref(false)
    return { isSetting }
});


