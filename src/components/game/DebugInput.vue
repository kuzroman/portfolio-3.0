<template>
  <pre class="debug-input">{{ seeds }}</pre>
</template>

<script>
export default {
  name: 'DebugInput',
  props: {
    seeds: { type: Array, default: [] },
  },
}
</script>

<style lang="scss" scoped>
.debug-input {
  border: 1px solid #42b983;
  background: #1c2334;
  padding: 5px 10px;
  position: absolute;
  top: 200px;
  left: 0;
}
</style>
