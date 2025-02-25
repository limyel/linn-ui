import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/page/blog/index.vue'),
        meta: {
            title: '博客首页'
        }
    },
    {
        path: '/login',
        component: () => import('@/page/admin/login.vue'),
        meta: {
            title: 'linn 登录页'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router