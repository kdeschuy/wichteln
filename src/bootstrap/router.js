import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

import { loadRouteTranslations } from './i18n'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/w/:uid',
      name: 'group',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (group.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: 'group' */ '../views/Group.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  await loadRouteTranslations(to.name, 'en')
  next()
})

export default router
