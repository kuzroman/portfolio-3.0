<template>
  <div class="status-bar" :class="{ active: isGameReady }">
    <div class="status-bar--top">
      <div class="score">{{ score }} points</div>
      <div class="status-bar--right">
        <IconTime />
        <IconShield />
        <div class="time">{{ haveTime }}s</div>
      </div>
    </div>
    <UI_Loader_line class="loader-Line" :percent="health" />
  </div>
</template>

<script>
import UI_Loader_line from '../UI/_LoaderLine.vue'
import IconTime from './IconTime.vue'
import IconShield from './IconShield.vue'
import { mapGetters, mapMutations } from 'vuex'
let intervalTime

export default {
  name: 'StatusBar',
  components: { UI_Loader_line, IconTime, IconShield },
  props: {
    score: { type: Number, default: 0 },
    time: { type: Number, default: 30 },
    damage: { type: Number, default: 0 },
  },
  data() {
    return {
      health: 100,
      haveTime: this.time,
    }
  },
  watch: {
    isGameStart() {
      intervalTime = setInterval(() => {
        this.haveTime -= 1
        if (this.haveTime <= 0 || this.isGameFinished) {
          this.setIsGameFinished(true)
          clearInterval(intervalTime)
        }
      }, 1000)
    },
    damage() {
      this.health -= 1
    },
  },
  computed: {
    ...mapGetters(['isGameReady', 'isGameStart', 'isGameFinished']),
  },
  methods: {
    ...mapMutations(['setIsGameFinished']),
  },
}
</script>

<style lang="scss">
@import '../../styles/props.scss';

.status-bar {
  position: absolute;
  top: 1em;
  left: 2em;
  transform: translateY(-5em);
  transition: transform 0.3s;

  & .score,
  & .time,
  & .icon-time,
  & .icon-shield {
    transform: translateY(-2em);
  }

  &.active {
    transform: translateY(0);

    & .score,
    & .time,
    & .icon-time,
    & .icon-shield {
      transform: translateY(0);
    }
  }

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
    transition: transform 0.3s 0.1s;
  }

  .time {
    color: $bg-9;
    font-size: 1.2em;
    line-height: 1.4em;
    font-weight: bold;
    display: inline-block;
    transition: transform 0.3s 0.4s;
  }

  & .icon-time {
    transition: transform 0.3s 0.2s;
  }
  & .icon-shield {
    transition: transform 0.3s 0.3s;
  }
}
</style>
