<template>
  <div class="button-play">
    <div class="ground"></div>
    <UI_Button />
  </div>
</template>

<script>
import UI_Button from '../UI/_Button.vue'

export default {
  name: 'ButtonPlay',
  components: { UI_Button },
  data() {
    return {
      barrier: {},
    }
  },
  computed: {},
  methods: {
    createBarrier() {
      let rect = this.$el.getBoundingClientRect()
      this.barrier = {
        xFrom: rect.left,
        xTo: rect.left + rect.width,
        y: rect.top,
      }
    },
  },
  mounted() {
    this.createBarrier()
    this.$emit('mounted-button-play', this.barrier)
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/props.scss';

.button-play {
  width: 200px;
  z-index: $zIndex-1;
  position: absolute;
  bottom: 100px;
  left: calc(50%);
  transform: translateX(-100px);
  transition: 0.3s bottom;

  &:hover {
    bottom: 98px;
  }

  //& .ground {
  //  background: #ffcc00;
  //}
}
</style>
