<template>
  <div class="button-play" @click="handleClick" :class="stiles">
    <UI_Button :text="text" />
  </div>
</template>

<script>
import UI_Button from '../UI/_Button.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ButtonPlay',
  components: { UI_Button },
  props: {},
  data() {
    return {
      barrier: {},
      texts: {
        default: 'Destroy this text',
        wait: 'Wait for falling ...',
        again: 'Play again',
      },
    }
  },
  computed: {
    ...mapGetters(['isSeedsFall', 'isGameReady', 'isGameFinished']),

    text() {
      return this.isGameFinished
        ? this.texts.again
        : this.isSeedsFall
        ? this.texts.wait
        : this.texts.default
    },
    stiles() {
      return { hide: this.isGameReady && !this.isGameFinished }
    },
  },
  methods: {
    ...mapMutations(['setIsGameReady']),

    handleClick() {
      if (this.isSeedsFall) return

      if (this.isGameFinished) {
        this.$emit('button-play--restart', this.barrier)
        return
      }

      setTimeout(() => {
        this.setIsGameReady(true)
      })
    },
    createBarrier() {
      let rect = this.$el.getBoundingClientRect()
      this.barrier = {
        x1: rect.left,
        x2: rect.left + rect.width,
        y1: rect.top,
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
  text-transform: uppercase;
  font-size: 0.8em;
  width: 14em;
  z-index: $zIndex-1;
  position: absolute;
  bottom: 100px;
  left: calc(50%);
  transform: translate(-7em, 0);
  transition: transform 0.3s;

  &:hover {
    bottom: 98px;
  }

  &.hide {
    transform: translateY(20em);
  }
}
</style>
