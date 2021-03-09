<template>
  <div class="robot-shooter" :class="{ active: isActive }" :style="left"></div>
</template>

<script>
export default {
  name: 'RobotShooter',
  props: {
    isActive: { type: Boolean, default: false },
    shooterX: { type: Number, default: 0 },
  },
  computed: {
    left() {
      return { left: this.shooterX + 'px' }
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
