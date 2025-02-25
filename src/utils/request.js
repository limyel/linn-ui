import axios from "axios";

// 创建 Axios 实例
const instance = axios.create({
    baseURL: "http://localhost:8080/linn", // API 基础 URL
    timeout: 7000, // 请求超时时间
})

export default instance;