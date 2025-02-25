// 全局路由前置守卫
import router from "@/router/index.js";
import {getToken} from "@/utils/auth.js";
import {showMsg} from "@/utils/msg.js";

router.beforeEach((to, from, next) => {
    let token = getToken()

    if (!token && to.path.startsWith('/admin')) {
        showMsg('请先登录', 'warning')
        next({path: '/login'})
    } else {
        next()
    }
})

// 全局路由后置守卫
router.afterEach((to, from) => {
    let title = (to.meta.title ? to.meta.title : '') + ' - linn'
    document.title = title
})