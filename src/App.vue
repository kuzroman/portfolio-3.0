<template>
  <div class="app">
    <MenuNavigation />
    <MenuBurger />

    <div class="content">
      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import MenuNavigation from './components/MenuNavigation.vue'
import MenuBurger from './components/MenuBurger.vue'

export default {
  name: 'App',
  components: { MenuNavigation, MenuBurger },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import './styles/index.scss';

.app {
  display: flex;
  flex-flow: column;
  height: 100%;

  .view {
    width: 100%;
    min-height: 100%;
    padding: 100px 0 50px;
    overflow: hidden;
    margin: auto;
    position: absolute;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.75s ease;
}

.fade-leave-active {
  transform: translate(60%, 0) perspective(100em) rotateY(90deg);
}

.fade-enter {
  transform: translate(-100%, 0);
}
.fade-enter-to {
  transform: translate(0, 0);
}
</style>
