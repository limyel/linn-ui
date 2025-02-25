import {ElMessage} from "element-plus";

// 消息提示
export function showMsg(message = '提示内容', type = 'success', customClass = '') {
    return ElMessage({
        type: type,
        message,
        customClass,
    })
}