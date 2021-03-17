<template>
  <div class="ui_loader-line">
    <div class="loader" :style="{ width }"></div>
  </div>
</template>

<script>
export default {
  name: 'UI_LoaderLine',
  props: {
    percent: { type: Number, default: 50 },
  },
  data() {
    return {}
  },
  computed: {
    width() {
      return `${this.percent}%`
    },
  },
}
</script>

<style lang="scss">
@import './_props.scss';

.ui_loader-line {
  width: 18em;
  height: 1.6em;
  background: $bg-2;

  .loader {
    height: 100%;
    background: $bg-10;
  }
}
</style>
