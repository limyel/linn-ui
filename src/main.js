import '@/assets/main.css'

import {createApp} from 'vue'
import App from '@/App.vue'
import router from "@/router/index.js"
import '@/permission.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia} from "pinia";

const app = createApp(App);

const pinia = createPinia()

// 注册 element-plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(pinia)
app.mount('#app')
