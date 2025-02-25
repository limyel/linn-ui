import {ElMessage} from "element-plus";
import 'element-plus/es/components/message/style/css'

// 消息提示
export function showMsg(message = '提示内容', type = 'success', customClass = '') {
    return ElMessage({
        type: type,
        message,
        customClass,
    })
}