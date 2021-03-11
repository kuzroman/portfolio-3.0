<template>
  <div class="main-game" @click="makeShot" @mousemove="moveShooter">
    <CanvasLetters :isDebug="isDebug" :barrier="barrier" :shot="shot" />
    <ButtonPlay
      @button-play--mounted="setBarrier"
      @button-play--restart="restartGame"
    />
    <StatusBar />
    <!--    :handleClick="handleClick"-->
    <RobotShooter :shooterX="shooterX" ref="robotShooter" />
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
      shooterX: 0,
      shot: {},
    }
  },
  computed: {
    ...mapGetters(['isGameFinished', 'isGameReady']),
  },
  methods: {
    ...mapMutations(['setIsGameStart', 'setIsGameFinished']),

    restartGame() {
      // restore letters ...
      this.setIsGameStart(false)
      this.setIsGameFinished(false)
    },
    setBarrier(barrier) {
      this.barrier = barrier
    },
    makeShot(ev) {
      // console.log(this.$refs.robotShooter)
      if (!this.isGameReady || this.isGameFinished) return
      this.setIsGameStart(true)
      this.shot = {
        x: ev.clientX,
        y: this.$refs.robotShooter.$el.getBoundingClientRect().top,
      }
    },
    moveShooter(ev) {
      this.shooterX = ev.clientX
    },
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
