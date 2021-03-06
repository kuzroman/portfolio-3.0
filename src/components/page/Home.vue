<template>
  <div class="home">
    <GameShooter />
  </div>
</template>

<script>
import GameShooter from '../GameShooter.vue'

export default {
  name: 'PageHome',
  components: { GameShooter },

  mounted() {},
  computed: {},
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  //background: #fc0;
}
</style>
