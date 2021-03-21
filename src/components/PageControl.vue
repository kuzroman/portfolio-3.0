<template>
  <UIIconArrow
    class="page-control"
    :direction="direction"
    :text="text"
    :fadeOut="fadeOut"
  ></UIIconArrow>
</template>

<script>
import { mapGetters } from 'vuex'
import UIIconArrow from './UI/IconArrow.vue'

export default {
  name: 'pageControl',
  components: { UIIconArrow },
  props: {
    direction: { type: String, default: 'right' },
    text: { type: String, default: 'PageName' },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('app', ['hidePageControl']),
    ...mapGetters('game', ['isGameReady']),

    fadeOut() {
      return this.hidePageControl || this.isGameReady
    },
  },
  methods: {},
}
</script>

<style lang="scss">
@import '../assets/styles/index.scss';

.page-control {
  z-index: $zIndex-2;
}
</style>
