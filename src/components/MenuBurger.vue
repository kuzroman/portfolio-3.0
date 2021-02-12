<template>
  <div
    class="icon-burger"
    @mouseover="addActive"
    @mouseleave="removeActive"
    @click="openMenu"
    :class="{ active: isActive }"
  >
    <i></i>
    <i></i>
    <i></i>
  </div>
</template>

<script>
export default {
  name: 'iconBurger',
  props: {
    isBurgerClicked: { type: Boolean, default: false },
  },
  data() {
    return {
      isActive: this.isActive,
    }
  },
  methods: {
    addActive() {
      this.isActive = true
    },
    removeActive() {
      this.isActive = false
    },
    openMenu() {
      // заменить на стор!!!!
      this.$emit('openNavigation')
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.icon-burger {
  position: fixed;
  right: 50px;
  top: 40px;
  z-index: $zIndex-2;
  cursor: pointer;
  padding: 5px 4px;

  & > i {
    display: block;
    width: 42px;
    height: 2px;
    margin: 8px;
    background-color: #7a7a7a;

    &:nth-child(n) {
      transition: transform 0.45s cubic-bezier(0.43, 0.77, 0.15, 1.5),
        background 0.3s ease;
    }
  }

  &.active {
    & > i:nth-child(1) {
      transform: translate3d(0, -4px, 0);
    }

    & > i:nth-child(3) {
      transform: translate3d(0, 4px, 0);
    }
  }
}
</style>
