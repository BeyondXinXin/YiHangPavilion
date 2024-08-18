import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', () => {
    const websitePreference = ref("default")
    const isClient = ref<Boolean>(false)
    onMounted(() => {
        if (typeof window !== 'undefined' && navigator.userAgent.indexOf('Chrome') > -1) {
            isClient.value = true;
        }
    });

    function custom() {
        websitePreference.value = "custom"
    }
    function reset() {
        websitePreference.value = "default"
    }
    return { isClient, websitePreference, custom, reset }
}, {
    persist: {
        storage: persistedState.localStorage,
    },
}
)




