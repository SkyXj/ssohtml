import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router)


export const constantRoutes = [
    {
        path:'/',
        name:'Login',
        component: () => import("@/views/login")
    }
]

export default new Router({
    mode: "history", // 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})