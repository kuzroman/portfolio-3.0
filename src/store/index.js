import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import game from './game'
import leaderBoard from './leaderBoard'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    game,
    leaderBoard,
  },
})
