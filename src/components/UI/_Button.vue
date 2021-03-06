<template>
  <div class="ui-button" :class="{ active: isActive }">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'UI_Button',
  props: {
    text: { type: String, default: 'Button' },
  },
  data() {
    return {
      isActive: false,
    }
  },
  computed: {},
  methods: {
    // addActive() {
    //   this.isActive = true
    // },
    // removeActive() {
    //   this.isActive = false
    // },
  },
}
</script>

<style lang="scss" scoped>
@import './_props.scss';

.ui-button {
  border-top: 1px solid $bg-1;
  background: #42b983;
  padding: 8px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 1);
  transition: 0.3s box-shadow;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    transition: 0.3s background-color;
  }

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.7);

    &:after {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
