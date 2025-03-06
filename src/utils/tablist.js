import {useStorage} from "@vueuse/core";

const TAB_LIST_KEY = 'linn_tab_list'
const storage = useStorage(TAB_LIST_KEY)

export function getTabList() {
    if (!storage.value) {
        return null
    }
    return JSON.parse(storage.value)
}

export function setTabList(tabList) {
    storage.value = JSON.stringify(tabList)
}