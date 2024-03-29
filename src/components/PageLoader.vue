<template>
  <div class="page-loader" :class="animations">
    <div class="circle">
      <div class="loader"></div>
      <div class="text">Hi!</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
const time = 300

export default {
  data() {
    return {
      animation: {
        zoom: false,
        rotate1: false,
        rotate2: false,
        fadeIn: false,
        tilt: false,
        goDown: false,
      },
      showLeftRing: false,
    }
  },
  computed: {
    animations() {
      return Object.keys(this.animation).reduce((a, key) => {
        return this.animation[key] === false ? a : a + ' ' + key
      }, '')
    },
  },
  methods: {
    ...mapMutations('app', ['setIsPageLoaderHide']),

    runAnimations() {
      Object.keys(this.animation).map((key, i) => {
        setTimeout(() => {
          this.animation[key] = true
          this.$emit(`animation-start-${key}`)
        }, time + time * i)
      })
    },
  },
  created() {
    this.$on('animation-start-goDown', () => {
      setTimeout(() => {
        this.setIsPageLoaderHide(true)
      }, time)
    })

    this.runAnimations()
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/index.scss';

.page-loader {
  $size: 150px;
  $time1: 0.3s;

  width: 100%;
  height: 100%;
  position: absolute;
  background: $color-6;
  z-index: $zIndex-4;
  transform: translateY(0);
  transition: transform 0.3s, opacity 0.6s;

  &.goDown {
    transform: translateY(100%);
    opacity: 0;
  }

  & .circle {
    border: 3px solid #42b983;
    border-radius: 100%;
    position: absolute;
    width: $size;
    height: $size;
    left: calc(50% - #{$size / 2});
    top: calc(50% - #{$size / 2});
    transition: transform 0.6s;
    transform: scale(0);
  }

  &.zoom {
    & .circle {
      transform: scale(1);
    }
  }

  &.tilt {
    & .circle {
      transform: rotate(45deg);
    }
  }

  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
  }
  .loader {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0 10px #fff;
  }
  .loader:before,
  .loader:after {
    width: #{$size / 2};
    height: $size;
    position: absolute;
    content: '';
    background: $color-6;
    top: -1px;
  }
  .loader:before {
    border-radius: 10.2em 0 0 10.2em;
    left: -1px;
    transform-origin: #{$size / 2};
    transform: rotate(0);
  }
  .loader:after {
    border-radius: 0 10.2em 10.2em 0;
    left: 74px;
    transform-origin: 0 #{$size / 2};
    transform: rotate(0);
  }

  &.rotate1 {
    & .loader:after {
      transition: transform $time1 linear;
      transform: rotate(180deg);
    }
  }

  &.rotate2 {
    & .loader:before {
      transition: $time1 transform linear;
      transform: rotate(180deg);
    }
  }

  &.fadeIn {
    & .loader {
      &:before,
      &:after {
        background: #42b983;
        transition: background $time1 linear;
      }
    }
    & .text {
      color: #fff;
    }
  }

  & .text {
    position: absolute;
    top: calc(50% - 36px);
    left: calc(50% - 32px);
    font-size: 3em;
    color: $color-10;
  }
}
</style>
