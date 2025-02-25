import {useStorage} from "@vueuse/core";

const TOKEN_KEY = 'linn_token'
const storage = useStorage(TOKEN_KEY)

export function getToken() {
  return storage.value
}

export function setToken(token) {
  storage.value = token
}

export function removeToken() {
  storage.value = null
}
