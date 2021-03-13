// import Vue from 'vue'
const defaultIsSeedsFall = false
const defaultIsGameReady = false
const defaultIsGameStart = false
const defaultIsGameFinished = false

export default {
  state: () => ({
    isSeedsFall: defaultIsSeedsFall,
    isGameReady: defaultIsGameReady,
    isGameStart: defaultIsGameStart,
    isGameFinished: defaultIsGameFinished,
  }),
  getters: {
    isSeedsFall: (state) => state.isSeedsFall,
    isGameReady: (state) => state.isGameReady,
    isGameStart: (state) => state.isGameStart,
    isGameFinished: (state) => state.isGameFinished,
  },
  mutations: {
    setIsSeedsFall(state, bool) {
      state.isSeedsFall = bool
    },
    setIsGameReady(state, bool) {
      state.isGameReady = bool
    },
    setIsGameStart(state, bool) {
      state.isGameStart = bool
    },
    setIsGameFinished(state, bool) {
      state.isGameFinished = bool
    },
    // updateLetter(state, letter) {
    //   Vue.set(state.letters, letter.id, letter)
    // },
    resetStateGame(state) {
      state.isSeedsFall = defaultIsSeedsFall
      state.isGameReady = defaultIsGameReady
      state.isGameStart = defaultIsGameStart
      state.isGameFinished = defaultIsGameFinished
    },
  },
}
