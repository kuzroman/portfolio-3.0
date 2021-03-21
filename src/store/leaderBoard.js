// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync('db.json')
// const db = low(adapter)

const getLeadersApi = 'http://localhost:3000/leaderBoards'
// const addLeadersApi = ''

export default {
  namespaced: true,

  state: () => ({
    leaders: [],
  }),
  getters: {
    leaders: (state) => state.leaders,
    getSortLeaders: (state) =>
      [...state.leaders].sort((a, b) => b.score - a.score),
  },
  mutations: {
    addLeader(state, leader) {
      state.leaders.push(leader)
    },
    addLeaders(state, leaders) {
      state.leaders = leaders
    },
  },
  actions: {
    getLeaders({ commit }) {
      fetch(getLeadersApi)
        .then((response) => response.json())
        .then((leaders) => {
          commit('addLeaders', leaders)
        })
    },
    // addLeader({ commit }) {},
  },
}
