<template>
  <div class="status-bar">
    <div class="status-bar--top">
      <div class="score">{{ score }} points</div>
      <div class="status-bar--right">
        <IconTime />
        <IconShield />
        <div class="time">{{ time }}s</div>
      </div>
    </div>
    <UI_Loader_line class="loader-Line" :percent="60" />
  </div>
</template>

<script>
import UI_Loader_line from '../UI/_LoaderLine.vue'
import IconTime from './IconTime.vue'
import IconShield from './IconShield.vue'

export default {
  name: 'StatusBar',
  components: { UI_Loader_line, IconTime, IconShield },
  props: {
    score: { type: Number, default: 0 },
  },
  data() {
    return {
      time: 30,
    }
  },
}
</script>

<style lang="scss">
@import '../../styles/props.scss';

.status-bar {
  position: absolute;
  top: 1em;
  left: 2em;

  &--top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.4em;
  }
  &--right {
    display: flex;
  }

  .score {
    color: $bg-9;
    font-size: 1.2em;
    line-height: 1.4em;
    font-weight: bold;
    display: inline-block;
  }

  .time {
    color: $bg-9;
    font-size: 1.2em;
    line-height: 1.4em;
    font-weight: bold;
    display: inline-block;
  }
}
</style>
