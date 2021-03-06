import router from '../router'

export default {
  state: () => ({
    isSiteFirstLoaded: true,
    isMenuNavigationOpened: false,
    hidePageControl: false,
    isActiveBurger: false,
    transitionDirection: '', // to-left || to-right
    // isPageLoaderHide: new Promise(resolve => {resolve()}),
    isPageLoaderHide: false,
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
    findSetTransitionDirection(state, { route, direction }) {
      if (direction) {
        state.transitionDirection = direction
        return
      }

      const { routes } = router.options
      const currentIndex = routes.findIndex(
        (x) => x.name === router.currentRoute.name
      )
      const goToIndex = routes.findIndex((x) => x.name === route.name)
      state.transitionDirection =
        currentIndex < goToIndex ? 'to-right' : 'to-left'
    },
    toPage(store, { route, direction }) {
      this.commit('setIsMenuNavigation', false)
      this.commit('setHidePageControl', true)

      this.commit('findSetTransitionDirection', { route, direction })
      setTimeout(() => router.push(route), 600)
      setTimeout(() => this.commit('setHidePageControl', false), 900)
    },
    setIsPageLoaderHide(state, bool) {
      state.isPageLoaderHide = bool
    },
  },
}
