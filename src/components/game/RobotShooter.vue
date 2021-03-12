<template>
  <div class="robot-shooter" :class="stiles" :style="left"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RobotShooter',
  props: {
    shooter: { type: Object, default: {} },
    damage: { type: Number, default: 0 },
  },
  data() {
    return {
      damage: 100,
    }
  },
  watch: {
    damage(damage) {
      this.health -= damage * 3
    },
  },
  computed: {
    ...mapGetters(['isGameReady', 'isGameFinished']),

    left() {
      return { left: this.shooter.x1 + 'px' }
    },
    stiles() {
      return { active: this.isGameReady && !this.isGameFinished }
    },
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
}
</style>
