import request from "@/utils/request.js";

export function login(username, password) {
    return request.post("/sys/user/login", {username, password})
}