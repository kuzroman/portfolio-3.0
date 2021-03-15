<template>
  <div class="robot-shooter" :class="stiles" :style="left"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import damageMp3 from '../../static/media/damage.mp3'
import Audio from '../abstractions/Audio'
const audioDamage = new Audio(damageMp3, 0.3)

export default {
  name: 'RobotShooter',
  props: {
    shooter: { type: Object, default: {} },
    damage: { type: Number, default: 0 },
  },
  data() {
    return {
      showDamage: false,
    }
  },
  watch: {
    damage() {
      this.showDamage = true
      audioDamage.replay()
      setTimeout(() => {
        this.showDamage = false
      }, 300)
    },
  },
  computed: {
    ...mapGetters(['isGameReady', 'isGameFinished']),

    left() {
      return { left: this.shooter.x1 + 'px' }
    },
    stiles() {
      return {
        active: this.isGameReady && !this.isGameFinished,
        damage: this.showDamage,
      }
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
  background: url('../../static/img/game/robot.png') no-repeat;
  transform: translateY(10em);
  transition: transform 0.3s;

  &.active {
    transform: translateY(0);
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
