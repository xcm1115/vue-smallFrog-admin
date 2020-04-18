import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import home from '@/components/home'
import dashBoard from '@/components/dashBoard'
import usersData from '@/components/usersData'
import allBooks from '@/components/booksData/allBooks'
import pcBooks from '@/components/booksData/pcBooks'
import enBooks from '@/components/booksData/enBooks'
import otherBooks from '@/components/booksData/otherBooks'
import ordersData from '@/components/ordersData'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashBoard'
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                title: '登录',
            }
        },
        {
            path: '/',
            name: 'home',
            component: home,
            children: [
                {
                    path: '/dashBoard',
                    component: dashBoard,
                    meta: { title: '首页' }
                },
                {
                    path: '/usersData',
                    name: 'usersData',
                    component: usersData,
                    meta: {
                        title: '用户管理',
                    }
                },
                {
                    path: '/booksData/allBooks',
                    name: 'allBooks',
                    component: allBooks,
                    meta: {
                        title: '书籍管理',
                    }
                },
                {
                    path: '/booksData/pcBooks',
                    name: 'pcBooks',
                    component: pcBooks,
                    meta: {
                        title: '书籍管理',
                    }
                },
                {
                    path: '/booksData/enBooks',
                    name: 'enBooks',
                    component: enBooks,
                    meta: {
                        title: '书籍管理',
                    }
                },
                {
                    path: '/booksData/otherBooks',
                    name: 'otherBooks',
                    component: otherBooks,
                    meta: {
                        title: '书籍管理',
                    }
                },
                {
                    path: '/ordersData',
                    name: 'ordersData',
                    component: ordersData,
                    meta: {
                        title: '订单管理', 
                    }
                }
            ]
        }
    ]
})