<template>
  <div class="game-shooter">
    <LettersBox :isDebug="isDebug" :barrier="barrier" />
    <ButtonPlay
      @mounted-button-play="setBarrier"
      @click.native="handlerClickPlay"
    />
    <StatusBar :isActive="isReady" />
  </div>
</template>

<script>
import LettersBox from './game/LettersBox.vue'
import ButtonPlay from './game/ButtonPlay.vue'
import StatusBar from './game/StatusBar.vue'

export default {
  name: 'GameShooter',
  components: { LettersBox, ButtonPlay, StatusBar },
  data() {
    return {
      barrier: null,
      isDebug: false,
      isReady: false,
    }
  },
  methods: {
    setBarrier(barrier) {
      this.barrier = barrier
    },
    handlerClickPlay() {
      console.log(1)
      this.isReady = !this.isReady //true
      // this.$emit('button-play--click')
    },
  },
}
</script>

<style lang="scss">
//@import '../styles/index.scss';

.game-shooter {
}
</style>
