import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'about',
      path: '/',
      component: () => import('../view/Game.vue'),
    },
    {
      name: 'works',
      path: '/works',
      component: () => import('../view/Works.vue'),
    },
    {
      name: 'skills',
      path: '/skills',
      component: () => import('../view/Skills.vue'),
    },
    {
      name: 'contacts',
      path: '/contacts',
      component: () => import('../view/Contacts.vue'),
    },
  ],
})
