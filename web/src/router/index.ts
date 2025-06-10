import {createRouter, createWebHistory} from 'vue-router'

const routes: any = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/home',
        component: () => import('@/components/Home.vue'),
        children: [
            {
                path: '/device_info',
                name: 'DeviceInfo',
                component: () => import('@/components/DeviceInfo.vue')
            },
            {
                path: '/device_manage',
                name: 'DeviceManage',
                component: () => import('@/components/DeviceManage.vue')
            },
            {
                path: '/device_alarm_manage',
                name: 'DeviceAlarmManage',
                component: () => import('@/components/DeviceAlarmManage.vue')
            },
            {
                path: '/user_manage',
                name: 'UserManage',
                component: () => import('@/components/UserManage.vue')
            },
            {
                path: '/user_operate_info',
                name: 'UserOperateInfo',
                component: () => import('@/components/UserOperateInfo.vue')
            },
            {
                path: '/device_resource_manage',
                name: 'DeviceResourceManage',
                component: () => import('@/components/DeviceResourceManage.vue')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
