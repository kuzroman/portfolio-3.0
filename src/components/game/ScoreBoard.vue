<template>
  <div class="score-board" :class="{ active: isGameFinished }">FINISHED</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ScoreBoard',
  props: {
    damage: { type: Number, default: 0 },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isGameFinished']),
  },
}
</script>

<style lang="scss">
@import '../../styles/props.scss';

.score-board {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20em;
  height: 20em;
  transform: translate(-50%, 200%);
  transition: 0.3s transform;
  background: #42b983;
  z-index: $zIndex-2;

  &.active {
    transform: translate(-50%, -50%);
  }
}
</style>
