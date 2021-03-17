<template>
  <div class="ui-button">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'UI_Button',
  props: {
    text: { type: String, default: 'Button' },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
@import './_props.scss';

.ui-button {
  background: $bg-2;
  padding: 8px;
  color: $bg-4;
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

  &:not(.disabled):hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.7);

    &:after {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
