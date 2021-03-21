<template>
  <div class="robot-shooter" :class="stiles" :style="left"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import damageMp3 from '../../assets/media/damage.mp3'
import CustomAudio from '../abstractions/Audio'
const audioDamage = new CustomAudio(damageMp3, 0.3)

export default {
  name: 'RobotShooter',
  props: {
    position: { type: Object, default: {} },
  },
  data() {
    return {
      isDamage: false,
    }
  },
  watch: {
    damage() {
      this.showDamage()
      audioDamage.replay()
    },
  },
  computed: {
    ...mapGetters('game', ['isGameReady', 'isGameFinished', 'damage']),

    left() {
      return { left: this.position.x1 + 'px' }
    },
    stiles() {
      return {
        active: this.isGameReady && !this.isGameFinished,
        damage: this.isDamage,
      }
    },
  },
  methods: {
    showDamage() {
      this.isDamage = true
      setTimeout(() => {
        this.isDamage = false
      }, 300)
    },
  },
  destroyed() {
    audioDamage.destroy()
  },
}
</script>

<style lang="scss">
.robot-shooter {
  width: 150px;
  height: 150px;
  position: absolute;
  bottom: 0;
  background: url('../../assets/img/game/robot.png') no-repeat;
  transform: translateY(10em);
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
  display: none;

  &.active {
    transform: translateY(0);
    opacity: 1;
    display: block;
  }

  &.damage {
    &:before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      border-radius: 50%;
      border-top: 1px solid #ec2525;
      transform: translate(-22px, -20px);
    }
  }
}
</style>
