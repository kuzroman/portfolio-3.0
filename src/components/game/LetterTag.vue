<template>
  <div v-if="sign !== '|'" class="letter-tag" :class="styles">
    {{ sign }}
  </div>
  <br v-else />
</template>

<script>
export default {
  name: 'LetterTag',
  props: {
    sign: { type: String, default: ' ' },
    isKilled: { type: Boolean, default: false },
    isShow: { type: Boolean, default: false },
  },
  data() {
    return {
      x1: null,
      x2: null,
      y1: null,
      y2: null,
      id: this.$vnode.key,
    }
  },
  watch: {
    isShow() {
      this.updateData()
      this.$emit('letter-tag--show', this.$data)
    },
  },
  computed: {
    styles() {
      return [{ show: this.isShow }, { hide: this.isKilled }]
    },
  },
  methods: {
    updateData() {
      let rect = this.$el.getBoundingClientRect()
      this.x1 = Math.ceil(rect.left)
      this.y1 = Math.ceil(rect.top)
      this.x2 = Math.ceil(rect.left + this.$el.clientWidth)
      this.y2 = Math.ceil(rect.top + this.$el.clientHeight)
    },
  },
}
</script>

<style lang="scss">
.letter-tag {
  font-size: 1em;
  display: inline-block;
  opacity: 0;

  &.show {
    opacity: 1;
  }

  &.hide {
    opacity: 0;
  }
}
</style>
