// import Seed from '../components/game/models/Seed'
// import Vue from 'vue'

export default {
  state: () => ({
    isSeedsFall: false,
    isGameReady: false,
    isGameStart: false,
    isGameFinished: false,
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
  },
}
