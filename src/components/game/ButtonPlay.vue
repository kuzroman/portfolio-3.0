<template>
  <div class="button-play" @click="handleClick" :class="{ hide: isReady }">
    <UI_Button :text="text" />
  </div>
</template>

<script>
import UI_Button from '../UI/_Button.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ButtonPlay',
  components: { UI_Button },
  props: {},
  data() {
    return {
      barrier: {},
      textDefault: 'Destroy this text',
      textWaiting: 'Wait for falling ...',
      isReady: false,
    }
  },
  computed: {
    ...mapGetters(['isSeedsFall']),

    text() {
      return this.isSeedsFall ? this.textWaiting : this.textDefault
    },
  },
  methods: {
    handleClick() {
      if (!this.isSeedsFall) {
        this.isReady = true
        this.$emit('button-play--game-ready', this.isReady)
      }
    },
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
    this.$emit('button-play--mounted', this.barrier)
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/props.scss';

.button-play {
  width: 12em;
  z-index: $zIndex-1;
  position: absolute;
  bottom: 100px;
  left: calc(50%);
  transform: translate(-6em, 0);
  transition: transform 0.3s;

  &:hover {
    bottom: 98px;
  }

  &.hide {
    transform: translateY(10em);
  }
}
</style>
