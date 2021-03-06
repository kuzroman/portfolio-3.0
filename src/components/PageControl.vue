<template>
  <UI_IconArrow
    class="page-control"
    :direction="direction"
    :text="text"
    :hidePageControl="hidePageControl"
  ></UI_IconArrow>
</template>

<script>
import { mapGetters } from 'vuex'
import UI_IconArrow from './UI/_IconArrow.vue'

export default {
  name: 'pageControl',
  components: { UI_IconArrow },
  props: {
    direction: { type: String, default: 'right' },
    text: { type: String, default: 'PageName' },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['hidePageControl']),

    // classPageControl() {
    //   return this.hidePageControl ? '' : 'fadeOut'
    // },
  },
  methods: {},
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.page-control {
  z-index: $zIndex-2;
}
</style>
