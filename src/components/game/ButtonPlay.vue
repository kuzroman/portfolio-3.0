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
      textDefault: 'Destroy this text',
      textWaiting: 'Wait for falling ...',
    }
  },
  computed: {
    ...mapGetters(['isSeedsFall', 'isGameReady']),

    text() {
      return this.isSeedsFall ? this.textWaiting : this.textDefault
    },
    stiles() {
      return { hide: this.isGameReady }
    },
  },
  methods: {
    ...mapMutations(['setIsGameReady']),

    handleClick() {
      if (!this.isSeedsFall) {
        setTimeout(() => {
          this.setIsGameReady(true)
        })
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
