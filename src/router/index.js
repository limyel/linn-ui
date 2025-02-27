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
            title: '登录页'
        }
    },
    {
        path: '/admin',
        component: () => import('@/layout/admin/admin.vue'),
        children: [
            {
                path: '/admin/index',
                component: () => import('@/page/admin/index.vue'),
                meta: {
                    title: '仪表盘'
                }
            },
            {
                path: '/admin/blog/articles',
                component: () => import('@/page/admin/blog/articles.vue'),
                meta: {
                    title: '文章管理'
                }
            },
            {
                path: '/admin/blog/tags',
                component: () => import('@/page/admin/blog/tags.vue'),
                meta: {
                    title: '标签管理'
                }
            },
            {
                path: '/admin/blog/setting',
                component: () => import('@/page/admin/blog/setting.vue'),
                meta: {
                    title: '博客设置'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router