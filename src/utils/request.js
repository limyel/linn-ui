import axios from "axios";
import {getToken} from "@/utils/auth.js";
import {showMsg} from "@/utils/msg.js";

// 创建 Axios 实例
const instance = axios.create({
    baseURL: "http://localhost:8080/linn", // API 基础 URL
    timeout: 7000, // 请求超时时间
})

instance.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers['token'] = token
    }

    return config
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(resp => {
    if (resp.data.code !== 0) {
        showMsg(resp.data.msg, 'error')
    }

    return resp.data
}, error => {
    return Promise.reject(error)
})

export default instance;