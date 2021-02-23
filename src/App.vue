<template>
  <div class="app">
    <MenuNavigation />
    <IconBurger />

    <div class="content">
      <div class="content-arrow">
        <a @click="goToPage(prevRoute, 'to-left')">
          <PageControl direction="left" :text="prevRoute.name" />
        </a>
      </div>

      <transition
        name="fade"
        @before-leave="beforeLeave"
        @after-enter="afterEnter"
      >
        <router-view class="view" :class="transitionDirection"></router-view>
      </transition>

      <div class="content-arrow right">
        <a @click="goToPage(nextRoute, 'to-right')">
          <PageControl direction="right" :text="nextRoute.name" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MenuNavigation from './components/MenuNavigation.vue'
import IconBurger from './components/IconBurger.vue'
import PageControl from './components/PageControl.vue'

export default {
  name: 'App',
  components: { IconBurger, MenuNavigation, PageControl },
  data() {
    return {
      transitionDirection: 'prev',
    }
  },
  methods: {
    goToPage(route, direction) {
      this.transitionDirection = direction
      console.log(this.transitionDirection)
      setTimeout(() => this.$router.push(route), 100)
    },
    beforeLeave() {
      console.log('beforeLeave')
    },
    afterEnter() {
      console.log('afterEnter')
    },
  },
  computed: {
    routesLen() {
      return this.$router.options.routes.length
    },
    currentRouteIndex() {
      return this.$router.options.routes.findIndex(
        (x) => x.path === this.$route.path
      )
    },
    prevRoute() {
      return this.currentRouteIndex === 0
        ? this.$router.options.routes[this.routesLen - 1]
        : this.$router.options.routes[this.currentRouteIndex - 1]
    },
    nextRoute() {
      // console.log(111)
      return this.currentRouteIndex === this.routesLen - 1
        ? this.$router.options.routes[0]
        : this.$router.options.routes[this.currentRouteIndex + 1]
    },
  },
}
</script>

<style lang="scss">
@import './styles/index.scss';

.app {
  height: 100%;

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;

    &-arrow {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 2em;
      //background: $bg-8;
      position: absolute;
      height: 100%;

      &.right {
        right: 0;
      }
    }
  }

  .view {
    padding: 0 20%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: $bg-8;
    position: absolute;
  }

  .to-left {
    &.fade-leave-active {
      animation: rotateNextLeave 0.6s forwards;
    }
    &.fade-enter-active {
      animation: rotateNextEnter 0.6s forwards;
    }
  }
  .to-right {
    &.fade-leave-active {
      animation: rotatePrevLeave 0.6s forwards;
    }
    &.fade-enter-active {
      animation: rotatePrevEnter 0.6s forwards;
    }
  }

  .fade-leave-active {
    z-index: $zIndex-1;
    animation: rotateNextLeave 0.6s forwards;
  }

  .fade-enter-active {
    animation: rotateNextEnter 0.6s forwards;
  }

  @keyframes rotateNextLeave {
    0% {
      left: 0;
      transform: rotateY(0deg);
    }
    100% {
      left: 50%;
      transform: perspective(100em) rotateY(90deg);
    }
  }

  @keyframes rotateNextEnter {
    0% {
      left: -100%;
    }
    100% {
      left: 0;
    }
  }

  @keyframes rotatePrevLeave {
    0% {
      left: 0;
      transform: rotateY(0deg);
    }
    100% {
      left: -50%;
      transform: perspective(100em) rotateY(270deg);
    }
  }

  @keyframes rotatePrevEnter {
    0% {
      left: 100%;
    }
    100% {
      left: 0;
    }
  }
}
</style>
