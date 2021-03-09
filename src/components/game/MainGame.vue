<template>
  <div class="main-game" @click="makeShot" @mousemove="moveShooter">
    <CanvasLetters :isDebug="isDebug" :barrier="barrier" :shot="shot" />
    <ButtonPlay
      @button-play--mounted="setBarrier"
      @button-play--game-ready="gameReady"
    />
    <StatusBar :isActive="isReady" />
    <RobotShooter :isActive="isReady" :shooterX="shooterX" />
  </div>
</template>

<script>
import ButtonPlay from './ButtonPlay.vue'
import StatusBar from './StatusBar.vue'
import RobotShooter from './RobotShooter.vue'
import CanvasLetters from './CanvasLetters.vue'

export default {
  name: 'GameShooter',
  components: { ButtonPlay, StatusBar, RobotShooter, CanvasLetters },
  data() {
    return {
      barrier: null,
      isDebug: true,
      isReady: false,
      shooterX: 0,
      shot: {},
    }
  },
  methods: {
    setBarrier(barrier) {
      this.barrier = barrier
    },
    gameReady(isReady) {
      this.isReady = isReady
    },
    makeShot(ev) {
      this.shot = { x: ev.clientX, y: ev.clientY }
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
