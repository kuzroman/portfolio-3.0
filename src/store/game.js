const defaultIsSeedsFall = false
const defaultIsGameReady = false
const defaultIsGameStart = false
const defaultIsGameFinished = false
const defaultScore = 0
const defaultLetters = []
const defaultShots = 0
const defaultDamage = 0
const defaultTimeLeft = 30
// Vue.set(state.letters, letter.id, letter)

export default {
  state: () => ({
    isSeedsFall: defaultIsSeedsFall,
    isGameReady: defaultIsGameReady,
    isGameStart: defaultIsGameStart,
    isGameFinished: defaultIsGameFinished,
    score: defaultScore,
    letters: [...defaultLetters],
    killedLetters: defaultLetters.length,
    shots: defaultShots,
    damage: defaultDamage,
    timeLeft: defaultTimeLeft,
  }),
  getters: {
    isSeedsFall: (state) => state.isSeedsFall,
    isGameReady: (state) => state.isGameReady,
    isGameStart: (state) => state.isGameStart,
    isGameFinished: (state) => state.isGameFinished,
    score: (state) => state.score,
    letters: (state) => state.letters,
    killedLetters: (state) =>
      state.letters.filter((x) => x.isKilled && !x.isService).length,
    aliveLetters: (state) =>
      state.letters.filter((x) => !x.isKilled && !x.isService).length,
    shots: (state) => state.shots,
    damage: (state) => state.damage,
    timeLeft: (state) => state.timeLeft,
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
      state.isGameReady = false
    },
    resetStateGame(state) {
      state.isSeedsFall = defaultIsSeedsFall
      state.isGameReady = defaultIsGameReady
      state.isGameStart = defaultIsGameStart
      state.isGameFinished = defaultIsGameFinished
      state.score = defaultScore
      state.letters = [...defaultLetters]
      state.shots = defaultShots
      state.damage = defaultDamage
      state.timeLeft = defaultTimeLeft
    },
    setScore(state, num) {
      state.score = num
    },
    setLetters(state, collection) {
      state.letters = collection
    },
    increaseShoots(state) {
      state.shots += 1
    },
    increaseDamage(state) {
      state.damage += 2
    },
    decreaseTimeLeft(state) {
      state.timeLeft -= 1
    },
  },
}
