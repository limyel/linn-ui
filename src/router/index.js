import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('../page/blog/index.vue'),
        meta: {
            title: '博客首页'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router