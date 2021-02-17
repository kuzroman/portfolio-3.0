import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuNavigationOpened: false,
    isActiveBurger: false,
  },
  getters: {
    isMenuNavigationOpened: (state) => state.isMenuNavigationOpened,
    isActiveBurger: (state) => state.isActiveBurger,
  },
  mutations: {
    switchMenuNavigation(state, bool) {
      state.isMenuNavigationOpened = bool
    },
  },
})
