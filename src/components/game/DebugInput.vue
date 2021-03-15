<template>
  <div class="debug-input">
    <pre class="left">{{ [...seeds, ...bullets] }}</pre>
    <pre class="right">{{ letters }}</pre>
    <!--    <pre class="left">{{ seeds }}</pre>-->
    <!--    <pre class="right">{{ shooter }}</pre>-->
  </div>
</template>

<script>
export default {
  name: 'DebugInput',
  props: {
    isDebug: { type: Boolean, default: false },
    seeds: { type: Array, default: [] },
    bullets: { type: Array, default: [] },
    letters: { type: Array, default: [] },
    shooter: { type: Object, default: {} },
  },
  data() {
    return {
      isPaused: false,
    }
  },
  methods: {
    setPauseKey(key) {
      const keyName = key || 'Space'
      document.body.addEventListener('keydown', (ev) => {
        if (ev.code === keyName) {
          this.isPaused = !this.isPaused
          // this.pause()
          this.$emit('debug-input--pause', this.isPaused)
        }
      })
      document.body.focus()
    },
  },
  created() {
    console.log(this.isDebug)
    if (this.isDebug) this.setPauseKey('Space')
  },
}
</script>

<style lang="scss">
.debug-input {
  pre {
    border: 1px solid #42b983;
    background: #1c2334;
    padding: 5px 10px;
    position: absolute;
    top: 200px;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
}
</style>
