<template>
  <div class="menu" :class="{ active: isMenuNavigationOpened }">
    <nav>
      <router-link to="/">
        <span>about</span>
      </router-link>
      <router-link to="/work">
        <span>work</span>
      </router-link>
      <router-link to="/skills">
        <span>skills</span>
      </router-link>
      <router-link to="/contact">
        <span>contact</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MenuNavigation',
  props: {},
  computed: {
    ...mapGetters(['isMenuNavigationOpened']),
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

.menu {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: $zIndex-2;
  background: $bg-6;
  top: -100%;
  transition: top 0.4s;

  &.active {
    top: 0;
  }

  & > nav {
    height: 100%;
    z-index: $zIndex-4;
    display: flex;
    flex-direction: column;
    padding: 50px;

    & > a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      position: relative;
      color: $color-1;
      text-align: center;
      font-size: 2em;
      text-decoration: none;
      overflow: hidden;
      transition: color 0.4s;
      font-weight: bold;

      &:hover {
        color: $color-2;

        &:before,
        &:after {
          transform: translateX(0);
        }
      }

      &:before,
      &:after {
        background: $bg-7;
        content: '';
        width: 100%;
        position: absolute;
        left: 0;
        transition: transform 0.4s cubic-bezier(0.65, 0.15, 0, 1);
      }

      &:before {
        transform: translateX(-100%);
        height: 70%;
        top: 0;
      }

      &:after {
        transform: translateX(100%);
        transition-delay: 125ms;
        height: 30%;
        bottom: 0;
      }

      > span {
        z-index: $zIndex-1;
        position: relative;
      }
    }
  }
}
</style>
