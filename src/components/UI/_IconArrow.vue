<template>
  <div
    class="icon-arrow"
    :class="classList"
    @mouseover="addActive"
    @mouseleave="removeActive"
  >
    <span>{{ text }}</span>
    <em></em>
  </div>
</template>

<script>
export default {
  name: 'UI_IconArrow', // animation/_IconArrow
  props: {
    direction: { type: String, default: 'left' },
    text: { type: String, default: 'someText' },
  },
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    classList() {
      let active = { active: this.isActive }
      let direction = { [this.direction]: true }
      return { ...active, ...direction }
    },
  },
  methods: {
    addActive() {
      this.isActive = true
    },
    removeActive() {
      this.isActive = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/props.scss';

$iconSize: 36px;

.icon-arrow {
  width: $iconSize;
  height: $iconSize;
  position: relative;
  cursor: pointer;
  //border: 1px solid;

  & span {
    display: block;
    position: absolute;
    line-height: $iconSize;
    opacity: 0;
    transition: opacity 0.1s ease 0.125s,
      right 0.3s cubic-bezier(0, 0, 0, 1) 0.125s,
      left 0.3s cubic-bezier(0, 0, 0, 1) 0.125s;
    color: $bg-9;
    font-weight: bold;
  }
  &.active {
    & span {
      opacity: 1;
    }
  }

  & em {
    &:before,
    &:after {
      content: ' ';
      position: absolute;
      right: 0;
      height: 100%;
      width: 2px;
      background-color: #7a7a7a;
      transform-origin: 50% 100% 0;
      transition: transform 0.16s ease-out;
      top: -50%;
    }
  }

  &.right {
    & span {
      right: 50%;
    }
    &.active {
      & span {
        right: 100%;
      }
    }
    & em {
      &:before {
        transform: rotate(-45deg);
      }

      &:after {
        transform: rotate(-135deg);
      }
    }
    &.active {
      & em {
        &:before {
          transform: rotate(-30deg);
        }
        &:after {
          transform: rotate(-150deg);
        }
      }
    }
  }

  &.left {
    & span {
      left: 50%;
    }
    &.active {
      & span {
        left: 100%;
      }
    }
    & em {
      &:before,
      &:after {
        left: 0;
      }

      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(135deg);
      }
    }
    &.active {
      & em {
        &:before {
          transform: rotate(30deg);
        }
        &:after {
          transform: rotate(150deg);
        }
      }
    }
  }
}
</style>
