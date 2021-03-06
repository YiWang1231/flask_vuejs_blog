// 路由文件
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import EditProfile from '@/components/EditProfile'
import Ping from '@/components/Ping'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/:id',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      // 用于修改自己的个人信息
      path: 'edit-profile',
      name: 'EditProfile',
      component: EditProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 现在客户端如果要访问 http://localhost:8080/#/，
  // 会被重定向到 http://localhost:8080/#/login?redirect=%2F 需要先登录验证才行
  const token = window.localStorage.getItem('blog-token')
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (token && to.name == 'Login') {
    // 用户已登录，但又去访问登录页面时不让他过去
    next({
      path: from.fullPath
    })
  } else {
    next()
  }
})

export default router
