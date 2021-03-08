<template>
  <div class="page-game">
    <GameShooter />
  </div>
</template>

<script>
import GameShooter from '../GameShooter.vue'

export default {
  name: 'PageGame',
  components: { GameShooter },

  mounted() {},
  computed: {},
}
</script>

<style lang="scss">
.page-game {
  width: 100%;
  height: 100%;
  display: block !important;
}
</style>
