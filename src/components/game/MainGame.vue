<template>
  <div
    class="main-game"
    @click="makeShot"
    @mousemove="moveShooter"
    :key="mainGameKey"
  >
    <CanvasLetters
      :isDebug="isDebug"
      :barrier="barrier"
      :shooter="shooterPosition"
      @canvas-letters-damage="increaseDamage"
    />
    <ButtonPlay
      @button-play--mounted="setBarrier"
      @button-play--restart="restartGame"
    />
    <StatusBar />
    <RobotShooter :position="shooterPosition" ref="robotShooter" />
    <ScoreBoard />
    <LeaderBoard />
  </div>
</template>

<script>
import ButtonPlay from './ButtonPlay.vue'
import StatusBar from './StatusBar.vue'
import RobotShooter from './RobotShooter.vue'
import CanvasLetters from './CanvasLetters.vue'
import ScoreBoard from './ScoreBoard.vue'
import LeaderBoard from './LeaderBoard.vue'
import { mapGetters, mapMutations } from 'vuex'
import CustomAudio from '../abstractions/Audio'
import shootMp3 from '../../assets/media/shoot.mp3'
import backgroundGame from '../../assets/media/backgroundGame.mp3'

const audioShot = new CustomAudio(shootMp3, 0.3)
const audioBg = new CustomAudio(backgroundGame, 0.5, true)

export default {
  name: 'MainGame',
  components: {
    ButtonPlay,
    StatusBar,
    RobotShooter,
    CanvasLetters,
    ScoreBoard,
    LeaderBoard,
  },
  data() {
    return {
      barrier: null,
      isDebug: false,
      shooterPosition: {},
      mainGameKey: 0,
    }
  },
  computed: {
    ...mapGetters('game', ['isGameFinished', 'isGameReady', 'shots', 'damage']),
  },
  watch: {
    isGameReady() {
      audioBg.replay()
    },
    isGameFinished() {
      audioBg.pause()
    },
  },
  methods: {
    ...mapMutations('game', [
      'setIsGameStart',
      'resetStateGame',
      'setIsGameFinished',
      'increaseShoots',
      'increaseDamage',
    ]),

    forceUpdateComponent() {
      this.mainGameKey += 1
    },
    restartGame() {
      this.resetStateGame()
      this.forceUpdateComponent()
      audioBg.destroy()
      audioShot.destroy()
    },
    setBarrier(barrier) {
      this.barrier = barrier
    },
    makeShot() {
      if (!this.isGameReady || this.isGameFinished) return
      this.setIsGameStart(true)
      this.increaseShoots()
      audioShot.replay()
    },
    moveShooter(ev) {
      if (!this.$refs.robotShooter) return
      const shooterEl = this.$refs.robotShooter.$el
      this.shooterPosition = {
        x1: ev.clientX,
        y1: shooterEl.getBoundingClientRect().top,
        x2: ev.clientX + shooterEl.offsetWidth,
      }
    },
    restartGameByResizeBody() {
      let timeId
      window.addEventListener('resize', () => {
        clearTimeout(timeId)
        timeId = setTimeout(() => {
          this.restartGame()
        }, 300)
      })
    },
  },
  mounted() {
    this.restartGameByResizeBody()
  },
  destroyed() {
    this.restartGame()
  },
}
</script>

<style lang="scss">
//@import '../assets/styles/index.scss';

.main-game {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
