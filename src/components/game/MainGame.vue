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
      :shot="shot"
      :shooter="shooter"
      @canvas-letter-damage="getDamage"
    />
    <ButtonPlay
      @button-play--mounted="setBarrier"
      @button-play--restart="restartGame"
    />
    <StatusBar :time="time" />
    <RobotShooter :shooter="shooter" ref="robotShooter" />
    <ScoreBoard />
  </div>
</template>

<script>
import ButtonPlay from './ButtonPlay.vue'
import StatusBar from './StatusBar.vue'
import RobotShooter from './RobotShooter.vue'
import CanvasLetters from './CanvasLetters.vue'
import ScoreBoard from './ScoreBoard.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MainGame',
  components: {
    ButtonPlay,
    StatusBar,
    RobotShooter,
    CanvasLetters,
    ScoreBoard,
  },
  data() {
    return {
      barrier: null,
      isDebug: true,
      time: 500,
      shooter: {},
      shot: 0,
      mainGameKey: 0,
      damage: 0,
    }
  },
  computed: {
    ...mapGetters(['isGameFinished', 'isGameReady']),
  },
  methods: {
    ...mapMutations(['setIsGameStart', 'resetStateGame']),

    forceUpdateComponent() {
      this.mainGameKey += 1
    },
    restartGame() {
      this.resetStateGame()
      this.forceUpdateComponent()
    },
    setBarrier(barrier) {
      this.barrier = barrier
    },
    makeShot(ev) {
      if (!this.isGameReady || this.isGameFinished) return
      this.setIsGameStart(true)
      this.shot += 1
    },
    moveShooter(ev) {
      this.shooter = {
        x1: ev.clientX,
        y1: this.$refs.robotShooter.$el.getBoundingClientRect().top,
        x2: ev.clientX + this.$refs.robotShooter.$el.offsetWidth,
      }
    },
    getDamage() {
      this.damage += 1
    },
  },
  mounted() {},
}
</script>

<style lang="scss">
//@import '../styles/index.scss';

.main-game {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
