import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../components/page/Home.vue'),
    },
    {
      name: 'works',
      path: '/works',
      component: () => import('../components/page/Works.vue'),
    },
    {
      name: 'skills',
      path: '/skills',
      component: () => import('../components/page/Skills.vue'),
    },
    {
      name: 'contacts',
      path: '/contacts',
      component: () => import('../components/page/Contacts.vue'),
    },
  ],
})
