import { useBookmarkStore } from '~/store/bookmarks'

export type ActionType = 'add' | 'update'
export type ActionTarget = 'domain' | 'category' | 'site'

const ACTION_NAME = {
    add: () => "添加",
    update: () => "更新",
}

const TARGET_NAME = {
    domain: () => "域",
    category: () => "类别",
    site: () => "网站",
}

type CommonProperties<T, U> = {
    [K in Extract<keyof T, keyof U>]: T[K] | U[K];
}

function getCommonProps<T extends object, U extends object>(obj1: T, obj2: U): CommonProperties<T, U> {
    const commonProps = {} as CommonProperties<T, U>
    Object.keys(obj1).forEach((key) => {
        const K = key as keyof CommonProperties<T, U>
        if (obj1[K] !== undefined && obj2[K] !== undefined)
            commonProps[K] = obj2[K]
    })
    return commonProps
}

export const useModalStore = defineStore('modal', () => {
    const bookmarkStore = useBookmarkStore()
    const modalVisible = ref(false)
    const action = ref<ActionType>('add')
    const target = ref<ActionTarget>('site')
    const title = computed(() => ACTION_NAME[action.value]() + TARGET_NAME[target.value]())

    const inputValues = reactive({
        name: '',
        url: '',
        favicon: '',
    })

    function showModal(actionType: ActionType, actionTarget: ActionTarget, categoryIndex = -1, siteIndex = -1) {
        action.value = actionType
        target.value = actionTarget
        if (categoryIndex !== -1)
            bookmarkStore.categoryIndex = categoryIndex
        if (siteIndex !== -1)
            bookmarkStore.siteIndex = siteIndex

        if (actionType === 'update') {
            const updateTarget = {
                site: () => getCommonProps(
                    inputValues, bookmarkStore.data[bookmarkStore.domainIndex].categoryList[categoryIndex].siteList[siteIndex]),
                category: () => getCommonProps(
                    inputValues, bookmarkStore.data[bookmarkStore.domainIndex].categoryList[categoryIndex]),
                domain: () => getCommonProps(
                    inputValues, bookmarkStore.data[bookmarkStore.domainIndex]),
            }
            Object.assign(inputValues, updateTarget[actionTarget]())
        }

        modalVisible.value = true
    }

    let now = 0
    const commitHandler = {
        add: {
            site: () => bookmarkStore.addSite({ id: now, ...inputValues }),
            category: () => bookmarkStore.addCategory({ id: now, name: inputValues.name, siteList: [] }),
            domain: () => bookmarkStore.addDomain({ id: now, name: inputValues.name, categoryList: [] }),
        },
        update: {
            site: () => bookmarkStore.updateSite({ ...inputValues }),
            category: () => bookmarkStore.updateCategory({ name: inputValues.name }),
            domain: () => bookmarkStore.updateDomain({ name: inputValues.name }),
        },
    }
    const deleteHandler = {
        site: () => bookmarkStore.deleteSite(),
        category: () => bookmarkStore.deleteCategory(),
        domain: () => bookmarkStore.deleteDomain(),
    }

    function handleCancel() {
        inputValues.name = ''
        inputValues.url = ''
        inputValues.favicon = ''
        modalVisible.value = false
    }
    let isCommit = false
    function handleCommit() {
        if (isCommit)
            return
        nextTick(() => {
            now = Date.now()
            commitHandler[action.value][target.value]()
            setTimeout(() => isCommit = false, 1000)
            handleCancel()
        })
    }

    function handleDelete() {
        nextTick(() => {
            deleteHandler[target.value]()
            handleCancel()
        })
    }

    return {
        modalVisible,
        action,
        target,
        title,
        inputValues,
        showModal,
        handleCancel,
        handleCommit,
        handleDelete,
    }
})
