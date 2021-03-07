<template>
  <div class="menu-navigation" :class="{ active: isMenuNavigationOpened }">
    <nav>
      <a v-for="route in routes" :key="route.name" @click="toPage({ route })">
        <span>{{ route.name }}</span>
      </a>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MenuNavigation',
  props: {},
  computed: {
    ...mapGetters(['isMenuNavigationOpened']),

    routes() {
      return this.$router.options.routes
    },
  },
  methods: {
    ...mapMutations(['toPage']),
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.menu-navigation {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: $zIndex-3;
  background: $bg-6;
  transform: translateY(-100%);
  transition: transform 0.4s;

  &.active {
    transform: translateY(0);
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
      cursor: pointer;

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
