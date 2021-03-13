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
      @canvas-letters-damage="getDamage"
    />
    <ButtonPlay
      @button-play--mounted="setBarrier"
      @button-play--restart="restartGame"
    />
    <StatusBar :time="time" :damage="damage" />
    <RobotShooter :shooter="shooter" :damage="damage" ref="robotShooter" />
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
import Audio from '../abstractions/Audio'
import shootMp3 from '../../static/media/shoot.mp3'

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
      isDebug: false,
      time: 500,
      shooter: {},
      shot: 0,
      mainGameKey: 0,
      damage: 0,
      soundDamage: {},
      audio: new Audio(shootMp3, 0.1),
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
    makeShot() {
      if (!this.isGameReady || this.isGameFinished) return
      this.setIsGameStart(true)
      this.shot += 1
      this.audio.replay()
    },
    moveShooter(ev) {
      let shooterEl = this.$refs.robotShooter.$el
      this.shooter = {
        x1: ev.clientX,
        y1: shooterEl ? shooterEl.getBoundingClientRect().top : -200,
        x2: ev.clientX + this.$refs.robotShooter.$el.offsetWidth,
      }
    },
    getDamage() {
      this.damage += 1
    },
  },
  destroyed() {
    this.restartGame()
  },
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
