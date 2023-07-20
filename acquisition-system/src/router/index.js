import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// 先将VueRouter原型对象上的push方法保存一份
const originPush = VueRouter.prototype.push

// 重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
Vue.use(VueRouter)
Vue.use(VueRouter)

// 路由信息
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home'),
    redirect: '/home/history_article_list',
    children: [
      {
        path: 'history_article_list',
        name: 'history_article_list',
        component: () => import('../views/Acquisition/HistoryArticleList')
      },
      {
        path: 'article_info',
        name: 'article_info',
        component: () => import('../views/Acquisition/ArticleInfo')
      },
      {
        path: 'public_accounts_info',
        name: 'public_accounts_info',
        component: () => import('../views/Acquisition/PublicAccountsInfo')
      },
      {
        path: 'search_article',
        name: 'search_article',
        component: () => import('../views/Acquisition/SearchArticle')
      },
      {
        path: 'article_analysis',
        name: 'article_analysis',
        component: () => import('../views/Analysis/ArticleAnalysis/index')
      },
      {
        path: 'public_account_analysis',
        name: 'public_account_analysis',
        component: () => import('../views/Analysis/HistoryArticleAnalysis/index')
      },
      {
        path: 'user_manage',
        name: 'user_manage',
        component: () => import('../views/PersonalCenter/UserManage/index')
      },
      {
        path: 'history_options',
        name: 'history_options',
        component: () => import('../views/PersonalCenter/HistoryOptions/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 全局前置守卫
router.beforeEach(async function (to, from, next) {
  const token = store.state.user.token
  if (token) {
    if (to.path === 'login' || to.path === '/register') {
      next('/home')
    } else {
      next()
    }
  } else {
    // 没有token,代表未登录，无法访问除登录注册外的页面
    if (to.path !== '/login' && to.path !== '/register') {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
