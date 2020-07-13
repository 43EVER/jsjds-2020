import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/editor',
        name: 'editor',
        // component: () => import('../components/NodeEditor.vue')
        component: () => import ('../views/ReteTest/Rete.vue')
      },
      {
        path: '/editor/:id',
        component: () => import('../components/NodeEditor.vue')
      },
      {
        path: '/modules',
        name: 'modules',
        component: () => import('../components/Modules.vue')
      },
      {
        path: '/bbs',
        name: 'bbs',
        component: () => import('../views/BBS.vue')
      },
      {
        path: '/',
        redirect: '/modules'
      }
      
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.path === '/login') next()

  // let data = sessionStorage.getItem("username");
  // if (data) next();
  // else next({ path: '/login' })
  // if (data) next();
  // else next('/login')
  next()
})

export default router
