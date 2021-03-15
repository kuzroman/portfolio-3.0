<template>
  <div class="app">
    <PageLoader v-if="!isPageLoaderHide" />
    <MenuNavigation />
    <IconBurger />
    <SoundBar />

    <div class="content">
      <div class="content-arrow">
        <a @click="toPage({ route: prevRoute, direction: 'to-left' })">
          <PageControl direction="left" :text="prevRoute.name" />
        </a>
      </div>

      <transition name="fade">
        <router-view class="view" :class="routeStyles"></router-view>
      </transition>

      <div class="content-arrow right">
        <a @click="toPage({ route: nextRoute, direction: 'to-right' })">
          <PageControl direction="right" :text="nextRoute.name" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import PageLoader from './components/PageLoader.vue'
import MenuNavigation from './components/MenuNavigation.vue'
import IconBurger from './components/IconBurger.vue'
import SoundBar from './components/SoundBar.vue'
import PageControl from './components/PageControl.vue'

export default {
  name: 'App',
  components: { PageLoader, IconBurger, MenuNavigation, PageControl, SoundBar },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['toPage', 'setIsSiteFirstLoaded']),
  },
  computed: {
    ...mapGetters([
      'transitionDirection',
      'isSiteFirstLoaded',
      'isPageLoaderHide',
      'isGameReady',
    ]),

    routes() {
      return this.$router.options.routes
    },
    routesLen() {
      return this.routes.length
    },
    routeStyles() {
      let styles = []
      styles.push(this.transitionDirection)
      if (this.isSiteFirstLoaded) {
        styles.push('first-loaded')
      }
      return styles
    },
    currentRouteIndex() {
      return this.routes.findIndex((x) => x.path === this.$route.path)
    },
    prevRoute() {
      return this.currentRouteIndex === 0
        ? this.routes[this.routesLen - 1]
        : this.routes[this.currentRouteIndex - 1]
    },
    nextRoute() {
      return this.currentRouteIndex === this.routesLen - 1
        ? this.routes[0]
        : this.routes[this.currentRouteIndex + 1]
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
      position: absolute;
      height: 100%;

      &.left {
        left: 2em;
      }

      &.right {
        right: 2em;
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

  .first-loaded {
    &.fade-enter-active {
      animation: rotateNextEnter 0s forwards;
    }
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
