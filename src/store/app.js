import router from '../router'

export default {
  namespaced: true,

  state: () => ({
    isSiteFirstLoaded: true,
    isMenuNavigationOpened: false,
    hidePageControl: false,
    isActiveBurger: false,
    transitionDirection: '', // to-left || to-right
    isPageLoaderHide: true, // true - disable PageLoader.vue
  }),
  getters: {
    isSiteFirstLoaded: (state) => state.isSiteFirstLoaded,
    isMenuNavigationOpened: (state) => state.isMenuNavigationOpened,
    isActiveBurger: (state) => state.isActiveBurger,
    transitionDirection: (state) => state.transitionDirection,
    hidePageControl: (state) => state.hidePageControl,
    isPageLoaderHide: (state) => state.isPageLoaderHide,
  },
  mutations: {
    setIsSiteFirstLoaded(state, bool) {
      state.isSiteFirstLoaded = bool
    },
    setIsMenuNavigation(state, bool) {
      state.isMenuNavigationOpened = bool
    },
    setHidePageControl(state, bool) {
      state.hidePageControl = bool
    },
    findDirection(state, route) {
      const { routes } = router.options
      const currentIndex = routes.findIndex(
        (x) => x.name === router.currentRoute.name
      )
      const goToIndex = routes.findIndex((x) => x.name === route.name)
      return currentIndex < goToIndex ? 'to-right' : 'to-left'
    },
    setDirection(state, direction) {
      state.transitionDirection = direction
    },
    toPage(store, { route, direction }) {
      this.commit('app/setIsMenuNavigation', false)
      this.commit('app/setHidePageControl', true)
      this.commit(
        'app/setDirection',
        direction || this.commit('app/findDirection', route)
      )
      setTimeout(() => router.push(route), 600)
      setTimeout(() => this.commit('app/setHidePageControl', false), 900)
    },
    setIsPageLoaderHide(state, bool) {
      state.isPageLoaderHide = bool
    },
  },
}
