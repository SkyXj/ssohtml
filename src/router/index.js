import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router)


export const constantRoutes = [
    {
        path:'/',
        name:'Login',
        component: () => import("@/views/login")
    },
    {
        path:'/home',
        name:'Home',
        component: () => import("@/views/home")
    },
    {
        path:'/video',
        name:'Video',
        component: () => import("@/views/video")
    }
]

export default new Router({
    mode: "history", // 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})