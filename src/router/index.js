import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import store from '~/store/user'

const routes = [{
    path: '/',
    component: () => import('v/Main.vue'),
    redirect: '/login',
    children: [{
        path: '/home',
        name: 'home',
        component: () => import('v/home/Home.vue')
      },
      {
        path: 'userList',
        name: 'userList',
        meta: ['数据管理', '用户列表'],
        component: () => import('v/user/userList.vue')
      },
      {
        path: 'shopList',
        name: 'shopList',
        meta: ['数据管理', '商家列表'],
        component: () => import('v/user/shopList.vue')
      },
      {
        path: 'foodsList',
        name: 'foodsList',
        meta: ['数据管理', '食品列表'],
        component: () => import('v/user/foodsList.vue')
      },
      {
        path: 'orderList',
        name: 'orderList',
        meta: ['数据管理', '订单列表'],
        component: () => import('v/user/orderList.vue')
      },
      {
        path: 'adminList',
        name: 'adminList',
        meta: ['数据管理', '管理员列表'],
        component: () => import('v/user/adminList.vue')
      },
      {
        path: 'addShop',
        name: 'addShop',
        meta: ['添加数据', '添加商铺'],
        component: () => import('v/addDate/addShop.vue')
      },
      {
        path: 'addFood',
        name: 'addFood',
        meta: ['添加数据', '添加食品'],
        component: () => import('v/addDate/addFood.vue')
      },
      {
        path: 'userLocation',
        name: 'userLocation',
        meta: ['图表', '用户分布'],
        component: () => import('v/charts/userLocation.vue')
      },
      {
        path:'adminSet',
        name:'adminSet',
        meta:['设置','管理员设置'],
        component:()=>import('v/admin/adminSet.vue')
      }
    ]
  },
  {
    path: '/login',
    name:'login',
    component: () => import('v/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('v/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => { 
  if (to.path!=='/login' &&localStorage.getItem('loginState')==='false'){
    next({name:'login'})
  }
   else next()
})
export default router