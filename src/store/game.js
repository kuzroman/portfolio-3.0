export default {
  state: () => ({
    isSeedsFall: false,
  }),
  getters: {
    isSeedsFall: (state) => state.isSeedsFall,
  },
  mutations: {
    setIsSeedsFall(state, bool) {
      state.isSeedsFall = bool
    },
    //   updateLetter(state, { key, letter }) {
    //     Vue.set(state.letters, key, letter)
    //   },
  },
}
